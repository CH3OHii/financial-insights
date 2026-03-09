'use client';
import { useState, useMemo } from 'react';

function computeLayout(nodes, links, W, H) {
  const pad = { l: 140, r: 140, t: 24, b: 24 };
  const nodeW = 15;
  const gap = 20;

  const incoming = new Set(links.map(l => l.target));
  const depth = {};
  nodes.forEach(n => { if (!incoming.has(n.id)) depth[n.id] = 0; });
  let ch = true;
  while (ch) {
    ch = false;
    links.forEach(l => {
      if (depth[l.source] !== undefined) {
        const nd = depth[l.source] + 1;
        if (depth[l.target] === undefined || depth[l.target] < nd) {
          depth[l.target] = nd;
          ch = true;
        }
      }
    });
  }

  const maxD = Math.max(...Object.values(depth));
  const colW = (W - pad.l - pad.r - nodeW) / Math.max(maxD, 1);

  const cols = {};
  nodes.forEach(n => { const c = depth[n.id] ?? 0; (cols[c] = cols[c] || []).push(n); });

  const usable = H - pad.t - pad.b;
  const maxColVal = Math.max(...Object.values(cols).map(c => c.reduce((s, n) => s + n.value, 0)));
  const scale = usable / (maxColVal * 1.3);

  const pos = {};
  Object.entries(cols).forEach(([col, ns]) => {
    const ci = parseInt(col);
    const x = pad.l + ci * colW;
    const totalH = ns.reduce((s, n) => s + n.value * scale, 0) + (ns.length - 1) * gap;
    let y = pad.t + (usable - totalH) / 2;
    ns.forEach(n => {
      const h = Math.max(n.value * scale, 5);
      pos[n.id] = { x, y, w: nodeW, h, col: ci };
      y += h + gap;
    });
  });

  const srcOff = {}, tgtOff = {};
  nodes.forEach(n => { srcOff[n.id] = 0; tgtOff[n.id] = 0; });

  const paths = links.map(l => {
    const s = pos[l.source], t = pos[l.target];
    const fh = Math.max(l.value * scale, 3);
    const x1 = s.x + s.w, y1 = s.y + srcOff[l.source];
    const x2 = t.x, y2 = t.y + tgtOff[l.target];
    srcOff[l.source] += fh;
    tgtOff[l.target] += fh;
    const cx = (x1 + x2) / 2;
    const d = `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2} L${x2},${y2 + fh} C${cx},${y2 + fh} ${cx},${y1 + fh} ${x1},${y1 + fh} Z`;
    const tn = nodes.find(n => n.id === l.target);
    const sn = nodes.find(n => n.id === l.source);
    let fill = 'rgba(148,163,184,0.22)';
    if (tn.type === 'cost') fill = 'rgba(239,68,68,0.18)';
    if (tn.type === 'profit') fill = 'rgba(22,163,74,0.2)';
    if (tn.type === 'loss') fill = 'rgba(127,29,29,0.22)';
    if (sn.type === 'segment') fill = 'rgba(148,163,184,0.2)';
    return { d, fill };
  });

  return { pos, paths, maxD };
}

export default function Sankey({ nodes, links, subtitle }) {
  const W = 960, H = 440;
  const { pos, paths, maxD } = useMemo(() => computeLayout(nodes, links, W, H), [nodes, links]);
  const [hov, setHov] = useState(null);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
      {paths.map((p, i) => (
        <path key={i} d={p.d}
          fill={hov === i ? p.fill.replace(/[\d.]+\)$/, '0.42)') : p.fill}
          onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
          style={{ transition: 'fill 0.2s' }} />
      ))}
      {nodes.map(n => {
        const p = pos[n.id];
        if (!p) return null;
        const isLeft = p.col === 0;
        const tx = isLeft ? p.x - 10 : p.x + p.w + 10;
        const anchor = isLeft ? 'end' : 'start';
        const cy = p.y + p.h / 2;
        const metaLines = n.meta ? n.meta.split('\n') : [];
        const nameColor =
          n.type === 'profit' ? '#4ADE80' :
          n.type === 'loss' ? '#FCA5A5' :
          n.type === 'cost' ? '#FCA5A5' : '#CBD5E1';
        return (
          <g key={n.id}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={4} fill={n.color} />
            <text x={tx} y={cy - metaLines.length * 7 - 4}
              textAnchor={anchor} fill={nameColor} fontSize={12.5} fontWeight={700}>
              {n.label}
            </text>
            {metaLines.map((line, i) => (
              <text key={i} x={tx} y={cy + 4 + i * 15}
                textAnchor={anchor}
                fill={i === 0 ? '#E2E8F0' : '#64748B'}
                fontSize={i === 0 ? 13.5 : 10.5}
                fontWeight={i === 0 ? 800 : 500}>
                {line}
              </text>
            ))}
          </g>
        );
      })}
      {subtitle && (
        <text x={W / 2} y={H - 4} textAnchor="middle" fill="#475569" fontSize={10}>{subtitle}</text>
      )}
    </svg>
  );
}
