'use client';
import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, ComposedChart, ReferenceLine, PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp, Layers, DollarSign, Building2, PiggyBank,
  ArrowUpRight, ArrowDownRight, Download, Table2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sankey from '@/components/Sankey';
import { MetricCard, SectionCard, AnalysisBox, ChartTooltip, BalanceBar } from '@/components/ChartUI';

const defaultTabs = [
  { id: 'overview', label: '总览' },
  { id: 'sankey', label: 'Sankey' },
  { id: 'margins', label: '利润率' },
  { id: 'capex', label: 'CapEx' },
  { id: 'balance', label: '资产负债' },
  { id: 'data', label: '数据表' },
];

function downloadCSV(rows, headers, filename) {
  const headerRow = headers.map(h => h.label).join(',');
  const body = rows.map(r => headers.map(h => {
    const v = r[h.key]; return v === null || v === undefined ? '' : v;
  }).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + headerRow + '\n' + body], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function CompanyDashboard({ config }) {
  const {
    name, ticker, period, endDate, icon, accentColor,
    overviewKPI, quarterlyRev, revBarKeys, revBarColors, revBarNames,
    sankeyNodes, sankeyLinks, sankeySubtitle,
    marginData, marginKPI,
    capexKPI, capexData, capexBarKeys, capexBarColors, capexBarNames,
    bsAssets, bsLiabilities, bsHistory, bsKPI,
    totalAssets, totalLiab, totalEquity,
    analysisOverview, analysisSankey, analysisMargin, analysisCapex, analysisBalance,
    incomeSnapshot, balanceSnapshot, consolidatedTable,
  } = config;

  const [tab, setTab] = useState('overview');

  return (
    <>
      <Header />
      <main className="relative z-10 flex-1">
        <div className="max-w-5xl mx-auto px-5 pt-8 pb-10">
          {/* Company Header */}
          <div className="flex items-center gap-3 mb-6 animate-fade-up opacity-0">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg text-xl"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 8px 20px ${accentColor}30` }}>
              {icon}
            </div>
            <div>
              <h1 className="text-2xl font-black font-body" style={{ color: accentColor }}>{name}</h1>
              <p className="text-slate-500 text-xs tracking-wider">{period} · {endDate} · {ticker}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 animate-fade-up opacity-0 stagger-1">
            <div className="flex gap-1 bg-surface-900/70 rounded-xl p-1 border border-slate-800/30 overflow-x-auto">
              {defaultTabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-1 min-w-0 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${tab === t.id ? 'bg-slate-700/80 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5 animate-fade-in opacity-0 stagger-2" key={tab}>

            {/* ===== OVERVIEW ===== */}
            {tab === 'overview' && (<>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {overviewKPI.map((k, i) => (
                  <MetricCard key={i} icon={k.icon || TrendingUp} title={k.title} value={k.value} sub={k.sub} positive={k.positive !== false} />
                ))}
              </div>
              <SectionCard title="收入构成 · 按季度" subtitle={`${revBarNames.join(' / ')}`}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={quarterlyRev} barCategoryGap="12%">
                    <XAxis dataKey="p" tick={{ fontSize: 9, fill: '#64748b' }} interval={Math.max(0, Math.floor(quarterlyRev.length / 8) - 1)} />
                    <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `${config.currencySymbol || '$'}${v}${config.unitLabel || 'B'}`} />
                    <Tooltip content={<ChartTooltip unit={config.unitLabel || 'B'} />} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    {revBarKeys.map((key, i) => (
                      <Bar key={key} dataKey={key} stackId="a" fill={revBarColors[i]} name={revBarNames[i]}
                        radius={i === revBarKeys.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>
              <AnalysisBox color="red" title="总览分析">
                {analysisOverview.map((t, i) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
              </AnalysisBox>
            </>)}

            {/* ===== SANKEY ===== */}
            {tab === 'sankey' && (<>
              <SectionCard title="收入流向图" subtitle={sankeySubtitle || '收入分部 → 成本结构 → 利润'}>
                <Sankey nodes={sankeyNodes} links={sankeyLinks} subtitle={`${period} · ${endDate}`} />
              </SectionCard>
              <AnalysisBox color="red" title="利润表分析">
                {analysisSankey.map((t, i) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
              </AnalysisBox>
            </>)}

            {/* ===== MARGINS ===== */}
            {tab === 'margins' && (<>
              <SectionCard title="利润率趋势" subtitle="毛利率 / 营业利润率 / 净利率">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={marginData}>
                    <XAxis dataKey="p" tick={{ fontSize: 9, fill: '#64748b' }} interval={Math.max(0, Math.floor(marginData.length / 8) - 1)} />
                    <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `${v}%`} />
                    <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
                    <Tooltip formatter={v => `${v}%`} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="gross" stroke="#10B981" strokeWidth={2.5} name="毛利率" dot={{ r: 3, fill: '#10B981' }} />
                    <Line type="monotone" dataKey="operating" stroke="#3B82F6" strokeWidth={2.5} name="营业利润率" dot={{ r: 3, fill: '#3B82F6' }} />
                    <Line type="monotone" dataKey="net" stroke="#8B5CF6" strokeWidth={2.5} name="净利率" dot={{ r: 3, fill: '#8B5CF6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </SectionCard>
              <div className="grid grid-cols-3 gap-3">
                {marginKPI.map((k, i) => (
                  <div key={i} className="bg-surface-900/50 rounded-xl p-4 text-center border border-slate-800/40">
                    <div className="text-xs text-slate-500 mb-1">{k.title}</div>
                    <div className={`text-2xl font-black ${k.color}`}>{k.value}</div>
                    <div className={`text-xs ${k.positive !== false ? 'text-emerald-400' : 'text-red-400'}`}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <AnalysisBox color="blue" title="利润率分析">
                {analysisMargin.map((t, i) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
              </AnalysisBox>
            </>)}

            {/* ===== CAPEX ===== */}
            {tab === 'capex' && (<>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {capexKPI.map((k, i) => (
                  <MetricCard key={i} icon={k.icon || Building2} title={k.title} value={k.value} sub={k.sub} positive={k.positive !== false} />
                ))}
              </div>
              <SectionCard title="资本支出构成 · 按季度">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={capexData} barCategoryGap="18%">
                    <XAxis dataKey="p" tick={{ fontSize: 9, fill: '#64748b' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `${config.currencySymbol || '$'}${v}${config.unitLabel || 'B'}`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `${v}%`} domain={[0, 'auto']} />
                    <Tooltip content={<ChartTooltip unit={config.unitLabel || 'B'} />} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    {capexBarKeys.map((key, i) => (
                      <Bar key={key} yAxisId="left" dataKey={key} stackId="a" fill={capexBarColors[i]} name={capexBarNames[i]}
                        radius={i === capexBarKeys.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]} />
                    ))}
                    <Line yAxisId="right" dataKey="ratio" stroke="#EF4444" strokeWidth={2} name="CapEx/收入%" dot={{ r: 3, fill: '#EF4444' }} strokeDasharray="5 3" />
                  </ComposedChart>
                </ResponsiveContainer>
              </SectionCard>
              <AnalysisBox color="amber" title="CapEx分析">
                {analysisCapex.map((t, i) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
              </AnalysisBox>
            </>)}

            {/* ===== BALANCE SHEET ===== */}
            {tab === 'balance' && (<>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bsKPI.map((k, i) => (
                  <MetricCard key={i} icon={k.icon || Layers} title={k.title} value={k.value} sub={k.sub} positive={k.positive !== false} />
                ))}
              </div>
              <SectionCard title={`资产负债结构 · ${period}`} subtitle="Hover 查看明细">
                <BalanceBar label="资产 Assets" items={bsAssets} total={totalAssets} />
                <BalanceBar label="负债 Liabilities" items={bsLiabilities} total={totalLiab} />
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">股东权益 Equity</span>
                    <span className="text-xs font-bold text-white font-mono">{config.currencySymbol || '$'}{(totalEquity / (config.eqDivisor || 1)).toFixed(1)}{config.eqUnit || 'B'}</span>
                  </div>
                  <div className="flex rounded-lg overflow-hidden h-9"
                    style={{ width: `${Math.min((totalEquity / totalAssets) * 100, 100)}%` }}>
                    <div className="w-full bg-emerald-600 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">Equity {((totalEquity / totalAssets) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </SectionCard>
              {bsHistory && bsHistory.length > 0 && (
                <SectionCard title="资产负债趋势">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={bsHistory} barCategoryGap="25%">
                      <XAxis dataKey="p" tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `${config.currencySymbol || '$'}${(v / (config.bsDivisor || 1)).toFixed(0)}${config.bsUnit || 'B'}`} />
                      <Tooltip content={<ChartTooltip unit="" />} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="liabilities" stackId="a" fill="#EF4444" name="负债" />
                      <Bar dataKey="equity" stackId="a" fill="#10B981" name="权益" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </SectionCard>
              )}
              <AnalysisBox color="indigo" title="资产负债分析">
                {analysisBalance.map((t, i) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
              </AnalysisBox>
            </>)}

            {/* ===== DATA TABLE ===== */}
            {tab === 'data' && (<>
              {incomeSnapshot && (<>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">利润表 · {period}</span>
                  <button onClick={() => downloadCSV(incomeSnapshot,
                    [{ key: 'item', label: 'Item' }, { key: 'value', label: 'Value' }, { key: 'pct', label: '%' }, { key: 'yoy', label: 'Y/Y' }],
                    `${ticker}_income.csv`)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 px-3 py-1.5 rounded-lg transition-colors">
                    <Download size={12} /> CSV
                  </button>
                </div>
                <div className="bg-surface-900/50 rounded-2xl border border-slate-800/50 overflow-hidden">
                  <table className="w-full text-xs font-mono">
                    <thead><tr className="border-b border-slate-800/60">
                      <th className="text-left px-4 py-2.5 text-slate-500 font-semibold">科目</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">金额</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">占收入%</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">Y/Y</th>
                    </tr></thead>
                    <tbody>
                      {incomeSnapshot.map((r, i) => {
                        const isTotal = r.isTotal;
                        return (
                          <tr key={i} className={`border-b border-slate-800/20 ${isTotal ? 'bg-slate-800/15' : ''}`}>
                            <td className={`px-4 py-2 ${isTotal ? 'text-white font-semibold' : 'text-slate-400'} ${r.indent ? 'pl-8' : ''}`}>{r.item}</td>
                            <td className={`text-right px-4 py-2 ${r.value < 0 ? 'text-red-400' : 'text-emerald-400'} ${isTotal ? 'font-semibold' : ''}`}>
                              {r.value < 0 ? `(${Math.abs(r.value).toLocaleString()})` : r.value.toLocaleString()}
                            </td>
                            <td className="text-right px-4 py-2 text-slate-500">{r.pct}</td>
                            <td className={`text-right px-4 py-2 ${r.yoy?.includes('+') ? 'text-emerald-400' : r.yoy?.includes('-') ? 'text-red-400' : 'text-slate-600'}`}>{r.yoy || '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>)}

              {balanceSnapshot && (<>
                <div className="flex items-center justify-between mt-6 mb-1">
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">资产负债表 · {period}</span>
                  <button onClick={() => downloadCSV(balanceSnapshot,
                    [{ key: 'item', label: 'Item' }, { key: 'value', label: 'Value' }, { key: 'category', label: 'Category' }],
                    `${ticker}_balance.csv`)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 px-3 py-1.5 rounded-lg transition-colors">
                    <Download size={12} /> CSV
                  </button>
                </div>
                <div className="bg-surface-900/50 rounded-2xl border border-slate-800/50 overflow-hidden">
                  <table className="w-full text-xs font-mono">
                    <thead><tr className="border-b border-slate-800/60">
                      <th className="text-left px-4 py-2.5 text-slate-500 font-semibold">科目</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">金额</th>
                    </tr></thead>
                    <tbody>
                      {balanceSnapshot.map((r, i) => {
                        const isTotal = r.category?.includes('total') || r.category === 'equity';
                        const isAsset = r.category?.startsWith('asset');
                        return (
                          <tr key={i} className={`border-b border-slate-800/20 ${isTotal ? 'bg-slate-800/15' : ''}`}>
                            <td className={`px-4 py-2 ${isTotal ? 'text-white font-semibold' : 'text-slate-400'}`}>{r.item}</td>
                            <td className={`text-right px-4 py-2 font-medium ${r.category === 'equity' ? 'text-emerald-400' : isAsset ? 'text-blue-400' : 'text-red-400'
                              } ${isTotal ? 'font-semibold' : ''}`}>{r.value.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>)}
            </>)}
          </div>

          <div className="text-center text-xs text-slate-600 mt-8 pt-4 border-t border-slate-800/30">
            仅供参考，不构成投资建议 · 数据来源: {name} {period} 财报 · 部分数据为估算值
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
