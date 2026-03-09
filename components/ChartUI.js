'use client';

/* ---- MetricCard ---- */
export function MetricCard({ icon: Icon, title, value, sub, positive = true }) {
  return (
    <div className="bg-surface-900/60 rounded-xl p-4 border border-slate-800/40 hover:border-slate-700/50 transition-colors">
      <div className="flex items-center gap-1.5 mb-2">
        {Icon && <Icon size={12} className="text-slate-500" />}
        <span className="text-xs uppercase tracking-widest text-slate-500 font-medium font-body">{title}</span>
      </div>
      <div className="text-xl font-extrabold text-white font-body">{value}</div>
      {sub && (
        <div className={`text-xs font-semibold mt-1 ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ---- SectionCard ---- */
export function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-surface-900/50 rounded-2xl border border-slate-800/50 p-5">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-body">{title}</h2>
      {subtitle && <p className="text-xs text-slate-600 mt-0.5 mb-3">{subtitle}</p>}
      {!subtitle && <div className="mb-3" />}
      {children}
    </div>
  );
}

/* ---- AnalysisBox ---- */
const analysisColors = {
  red: 'from-red-950/20 to-surface-900/30 border-red-900/20',
  blue: 'from-blue-950/20 to-surface-900/30 border-blue-900/20',
  amber: 'from-amber-950/20 to-surface-900/30 border-amber-900/20',
  indigo: 'from-indigo-950/20 to-surface-900/30 border-indigo-900/20',
};
const analysisTitleColors = {
  red: 'text-red-400', blue: 'text-blue-400', amber: 'text-amber-400', indigo: 'text-indigo-400',
};

export function AnalysisBox({ color = 'red', title, children }) {
  return (
    <div className={`bg-gradient-to-r ${analysisColors[color]} rounded-2xl border p-5`}>
      <h2 className={`text-sm font-bold uppercase tracking-widest mb-3 ${analysisTitleColors[color]}`}>{title}</h2>
      <div className="space-y-2 text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

/* ---- ChartTooltip ---- */
export function ChartTooltip({ active, payload, label, unit = 'M' }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + (p.value || 0), 0);
  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-lg p-3 shadow-xl text-xs font-body">
      <div className="font-bold text-white mb-1.5">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex justify-between gap-6 mb-0.5">
          <span style={{ color: p.color || p.fill }}>{p.name}</span>
          <span className="text-white font-mono">${typeof p.value === 'number' ? p.value.toLocaleString() : p.value}{unit}</span>
        </div>
      ))}
      {payload.length > 1 && (
        <div className="border-t border-slate-700 mt-1 pt-1 flex justify-between font-bold">
          <span className="text-slate-400">合计</span>
          <span className="text-white font-mono">${total.toLocaleString()}{unit}</span>
        </div>
      )}
    </div>
  );
}

/* ---- BalanceBar ---- */
export function BalanceBar({ label, items, total }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{label}</span>
        <span className="text-xs font-bold text-white font-mono">${(total / 1000).toFixed(1)}B</span>
      </div>
      <div className="flex rounded-lg overflow-hidden h-9">
        {items.map((item, i) => {
          const pct = (item.value / total) * 100;
          if (pct < 1.5) return null;
          return (
            <div key={i} className="relative group" style={{ width: `${pct}%`, backgroundColor: item.color }}>
              <div className="absolute inset-0 flex items-center justify-center">
                {pct > 8 && (
                  <span className="text-white font-semibold truncate px-1"
                    style={{ fontSize: pct > 15 ? 10 : 8 }}>
                    {item.name}
                  </span>
                )}
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                <div className="text-white font-semibold">{item.name}</div>
                <div className="text-slate-400">${(item.value / 1000).toFixed(2)}B ({pct.toFixed(1)}%)</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-slate-500">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
