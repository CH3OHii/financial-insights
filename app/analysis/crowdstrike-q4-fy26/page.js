'use client';
import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, ComposedChart, ReferenceLine
} from 'recharts';
import {
  Shield, TrendingUp, Users, Layers, DollarSign,
  Building2, PiggyBank, ArrowUpRight, ArrowDownRight, Download, Table2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sankey from '@/components/Sankey';
import { MetricCard, SectionCard, AnalysisBox, ChartTooltip, BalanceBar } from '@/components/ChartUI';
import {
  sankeyNodes, sankeyLinks, quarterlyRev, marginData,
  capexData, bsAssets, bsLiabilities, bsHistory,
  totalAssets, totalLiab, totalEquity,
  buildConsolidatedTable, incomeSnapshot, balanceSnapshot,
} from '@/data/crowdstrike';

const tabs = [
  { id: 'overview', label: '总览' },
  { id: 'sankey',   label: 'Sankey' },
  { id: 'margins',  label: '利润率' },
  { id: 'capex',    label: 'CapEx' },
  { id: 'balance',  label: '资产负债' },
  { id: 'data',     label: '数据表' },
];

export default function CrowdStrikePage() {
  const [tab, setTab] = useState('overview');
  const consolidated = useMemo(() => buildConsolidatedTable(), []);

  // CSV export
  function downloadCSV(rows, headers, filename) {
    const headerRow = headers.map(h => h.label).join(',');
    const body = rows.map(r => headers.map(h => {
      const v = r[h.key];
      return v === null || v === undefined ? '' : v;
    }).join(',')).join('\n');
    const csv = '\uFEFF' + headerRow + '\n' + body;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Header />
      <main className="relative z-10 flex-1">
        <div className="max-w-5xl mx-auto px-5 pt-8 pb-10">
          {/* Company Header */}
          <div className="flex items-center gap-3 mb-6 animate-fade-up opacity-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-body" style={{ color: '#F04438' }}>
                CROWDSTRIKE
              </h1>
              <p className="text-slate-500 text-xs tracking-wider">
                Q4 FY26 · 截至2026年1月 · NASDAQ: CRWD
              </p>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="mb-6 animate-fade-up opacity-0 stagger-1">
            <div className="flex gap-1 bg-surface-900/70 rounded-xl p-1 border border-slate-800/30">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                    tab === t.id
                      ? 'bg-slate-700/80 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5 animate-fade-in opacity-0 stagger-2" key={tab}>

            {/* ==================== OVERVIEW ==================== */}
            {tab === 'overview' && (<>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MetricCard icon={TrendingUp} title="营业收入" value="$1,305M" sub="+23% Y/Y" />
                <MetricCard icon={Shield} title="ARR" value="$5.25B" sub="+24% Y/Y" />
                <MetricCard icon={Users} title="6+模块客户" value="50%" sub="+2pp Y/Y" />
                <MetricCard icon={Layers} title="毛利率" value="76%" sub="+2pp Y/Y" />
              </div>

              <SectionCard title="收入构成 · 按季度" subtitle="订阅收入占比持续超过95%">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={quarterlyRev} barCategoryGap="12%">
                    <XAxis dataKey="p" tick={{ fontSize: 9, fill: '#64748b' }} interval={1} />
                    <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `$${v}M`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="svc" stackId="a" fill="#6366F1" name="专业服务" />
                    <Bar dataKey="sub" stackId="a" fill="#DC2626" name="订阅" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>

              <AnalysisBox color="red" title="总览分析">
                <p><span className="text-white font-semibold">收入加速增长：</span>总收入同比增长23%至$13.05亿，订阅收入($12.42亿)和专业服务($0.63亿)均保持双位数增长。ARR达$52.5亿，体现平台化战略的强劲势头。</p>
                <p><span className="text-white font-semibold">模块化交叉销售：</span>50%的客户已采用6+安全模块(+2pp)、34%采用7+模块(+2pp)，Falcon平台的"land and expand"策略正在加速提升客户价值。</p>
              </AnalysisBox>
            </>)}

            {/* ==================== SANKEY ==================== */}
            {tab === 'sankey' && (<>
              <SectionCard title="收入流向图 · Q4 FY26 利润表" subtitle="收入分部 → 成本结构 → 运营费用明细">
                <Sankey nodes={sankeyNodes} links={sankeyLinks} subtitle="Q4 FY26 · Ending Jan. 2026" />
              </SectionCard>

              <AnalysisBox color="red" title="利润表分析">
                <p><span className="text-white font-semibold">高毛利 + 运营亏损：</span>76%毛利率(+2pp Y/Y)体现SaaS产品定价强劲，但$9.96亿运营费用略超$9.89亿毛利，造成$700万运营亏损。</p>
                <p><span className="text-white font-semibold">费用率全面收缩：</span>S&M(36%, -3pp)、R&D(28%, -2pp)、G&A(13%, -1pp)占收入比全线下降，运营杠杆持续改善，营业利润率从(9%)收窄至(1%)。</p>
                <p><span className="text-white font-semibold">盈利拐点将至：</span>按当前费用率下降速度，CrowdStrike有望在FY27实现GAAP运营盈利。</p>
              </AnalysisBox>
            </>)}

            {/* ==================== MARGINS ==================== */}
            {tab === 'margins' && (<>
              <SectionCard title="利润率趋势" subtitle="毛利率稳健，运营利润率持续改善">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={marginData}>
                    <XAxis dataKey="p" tick={{ fontSize: 9, fill: '#64748b' }} interval={1} />
                    <YAxis domain={[-20, 85]} tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `${v}%`} />
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
                <div className="bg-surface-900/50 rounded-xl p-4 text-center border border-slate-800/40">
                  <div className="text-xs text-slate-500 mb-1">毛利率</div>
                  <div className="text-2xl font-black text-emerald-400">76%</div>
                  <div className="text-xs text-emerald-400">+2pp Y/Y</div>
                </div>
                <div className="bg-surface-900/50 rounded-xl p-4 text-center border border-slate-800/40">
                  <div className="text-xs text-slate-500 mb-1">营业利润率</div>
                  <div className="text-2xl font-black text-blue-400">(1%)</div>
                  <div className="text-xs text-emerald-400">+8pp Y/Y</div>
                </div>
                <div className="bg-surface-900/50 rounded-xl p-4 text-center border border-slate-800/40">
                  <div className="text-xs text-slate-500 mb-1">净利率</div>
                  <div className="text-2xl font-black text-violet-400">(1%)</div>
                  <div className="text-xs text-emerald-400">+9pp Y/Y</div>
                </div>
              </div>

              <AnalysisBox color="blue" title="利润率分析">
                <p><span className="text-white font-semibold">毛利率稳中有升：</span>从FY24的74%提升至76%，主要受益于订阅收入占比提高和基础设施效率改善，SaaS规模效应持续显现。</p>
                <p><span className="text-white font-semibold">运营利润率快速收窄：</span>从Q1&apos;24的(12%)大幅改善至(1%)，累计改善11个百分点。费用率全面下降，运营杠杆效应显著。</p>
                <p><span className="text-white font-semibold">非GAAP已盈利：</span>虽然GAAP仍微亏，但非GAAP营业利润率已达约25%，差异主要来自股权激励(SBC)摊销。</p>
              </AnalysisBox>
            </>)}

            {/* ==================== CAPEX ==================== */}
            {tab === 'capex' && (<>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MetricCard icon={Building2} title="Q4 CapEx" value="$138M" sub="CapEx/Rev 10.6%" positive={false} />
                <MetricCard icon={PiggyBank} title="自由现金流" value="$412M" sub="FCF Margin 31.6%" />
                <MetricCard icon={DollarSign} title="经营性现金流" value="$550M" sub="+28% Y/Y" />
                <MetricCard icon={ArrowUpRight} title="FY26 总CapEx" value="$515M" sub="+18% Y/Y" positive={false} />
              </div>

              <SectionCard title="资本支出构成 · 按季度" subtitle="PP&E为主，资本化软件投入持续增加">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={capexData} barCategoryGap="18%">
                    <XAxis dataKey="p" tick={{ fontSize: 9, fill: '#64748b' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `$${v}M`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `${v}%`} domain={[0, 16]} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar yAxisId="left" dataKey="ppe" stackId="a" fill="#F59E0B" name="PP&E" />
                    <Bar yAxisId="left" dataKey="sw" stackId="a" fill="#FBBF24" name="资本化软件" />
                    <Bar yAxisId="left" dataKey="other" stackId="a" fill="#FDE68A" name="其他" radius={[3,3,0,0]} />
                    <Line yAxisId="right" dataKey="ratio" stroke="#EF4444" strokeWidth={2} name="CapEx/收入%" dot={{ r: 3, fill: '#EF4444' }} strokeDasharray="5 3" />
                  </ComposedChart>
                </ResponsiveContainer>
              </SectionCard>

              <AnalysisBox color="amber" title="CapEx分析">
                <p><span className="text-white font-semibold">投资强度温和上升：</span>CapEx/收入比从9.1%逐步升至10.6%，反映CrowdStrike正在扩大云基础设施投入以支撑Falcon平台全球部署。</p>
                <p><span className="text-white font-semibold">软件资本化比例提高：</span>资本化软件从$18M升至$35M，占CapEx比从20%升至25%，体现持续加大产品研发投入。</p>
                <p><span className="text-white font-semibold">强劲现金流：</span>自由现金流达$4.12亿(FCF margin 31.6%)，经营现金流$5.5亿同比增长28%，远超收入增速，体现高效现金转化。</p>
              </AnalysisBox>
            </>)}

            {/* ==================== BALANCE SHEET ==================== */}
            {tab === 'balance' && (<>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <MetricCard icon={Layers} title="总资产" value={`$${(totalAssets / 1000).toFixed(1)}B`} sub="+12% Y/Y" />
                <MetricCard icon={ArrowDownRight} title="总负债" value={`$${(totalLiab / 1000).toFixed(1)}B`} sub="+9% Y/Y" positive={false} />
                <MetricCard icon={DollarSign} title="股东权益" value={`$${(totalEquity / 1000).toFixed(1)}B`} sub="+20% Y/Y" />
                <MetricCard icon={Shield} title="Debt/Equity" value="0.97x" sub="健康水平" />
              </div>

              <SectionCard title="资产负债结构 · Q4 FY26" subtitle="Hover 查看各项明细">
                <BalanceBar label="资产 Assets" items={bsAssets} total={totalAssets} />
                <BalanceBar label="负债 Liabilities" items={bsLiabilities} total={totalLiab} />
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">股东权益 Equity</span>
                    <span className="text-xs font-bold text-white font-mono">${(totalEquity / 1000).toFixed(1)}B</span>
                  </div>
                  <div className="flex rounded-lg overflow-hidden h-9"
                    style={{ width: `${(totalEquity / totalAssets) * 100}%` }}>
                    <div className="w-full bg-emerald-600 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        Equity {((totalEquity / totalAssets) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="资产负债趋势 · FY23–FY26">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={bsHistory} barCategoryGap="25%">
                    <XAxis dataKey="p" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}B`} />
                    <Tooltip content={<ChartTooltip unit="" />} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="liabilities" stackId="a" fill="#EF4444" name="负债" />
                    <Bar dataKey="equity" stackId="a" fill="#10B981" name="权益" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>

              <AnalysisBox color="indigo" title="资产负债分析">
                <p><span className="text-white font-semibold">轻资产+高商誉：</span>商誉及无形资产$61.2亿占总资产46%，主要来自历次收购。固定资产仅$7.8亿，体现典型SaaS轻资产模式。</p>
                <p><span className="text-white font-semibold">递延收入是正信号：</span>递延收入$41.8亿占负债44%，代表已收取但尚未确认的订阅收入，是SaaS核心健康指标。</p>
                <p><span className="text-white font-semibold">杠杆可控：</span>D/E 0.97x处于合理水平，长期债务$32.5亿为低息可转债。现金+短投$37.9亿充裕覆盖短期债务。</p>
                <p><span className="text-white font-semibold">权益快速增长：</span>股东权益从FY23的$14.5亿增至$37.3亿(+157%)，资产负债表持续改善。</p>
              </AnalysisBox>
            </>)}

            {/* ==================== DATA TABLE ==================== */}
            {tab === 'data' && (<>
              {/* Quarterly consolidated table */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Table2 size={14} className="text-slate-500" />
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">按季度汇总</span>
                </div>
                <button
                  onClick={() => {
                    const headers = [
                      { key: 'period', label: 'Period' },
                      { key: 'subscription', label: 'Subscription ($M)' },
                      { key: 'profServices', label: 'Prof Services ($M)' },
                      { key: 'totalRev', label: 'Total Revenue ($M)' },
                      { key: 'costOfRev', label: 'Cost of Revenue ($M)' },
                      { key: 'grossProfit', label: 'Gross Profit ($M)' },
                      { key: 'grossMargin', label: 'Gross Margin (%)' },
                      { key: 'opex', label: 'Total OpEx ($M)' },
                      { key: 'opIncome', label: 'Operating Income ($M)' },
                      { key: 'opMargin', label: 'Operating Margin (%)' },
                      { key: 'netMargin', label: 'Net Margin (%)' },
                      { key: 'ppeCap', label: 'CapEx PP&E ($M)' },
                      { key: 'swCap', label: 'CapEx Software ($M)' },
                      { key: 'otherCap', label: 'CapEx Other ($M)' },
                      { key: 'totalCapex', label: 'Total CapEx ($M)' },
                      { key: 'capRatio', label: 'CapEx/Rev (%)' },
                    ];
                    downloadCSV(consolidated, headers, 'CRWD_quarterly.csv');
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Download size={12} /> 导出 CSV
                </button>
              </div>
              <div className="bg-surface-900/50 rounded-2xl border border-slate-800/50 overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800/60">
                      <th className="sticky left-0 bg-surface-900 z-10 text-left px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">季度</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">订阅</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">专业服务</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">总收入</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">营业成本</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">毛利</th>
                      <th className="text-right px-3 py-2.5 text-emerald-600 font-semibold whitespace-nowrap">毛利率</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">运营费用</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">营业利润</th>
                      <th className="text-right px-3 py-2.5 text-blue-500 font-semibold whitespace-nowrap">营业利润率</th>
                      <th className="text-right px-3 py-2.5 text-violet-500 font-semibold whitespace-nowrap">净利率</th>
                      <th className="text-right px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">CapEx</th>
                      <th className="text-right px-3 py-2.5 text-amber-600 font-semibold whitespace-nowrap">CapEx/Rev</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consolidated.map((r, i) => {
                      const isLatest = i === consolidated.length - 1;
                      return (
                        <tr key={r.period}
                          className={`border-b border-slate-800/30 ${isLatest ? 'bg-slate-800/20' : 'hover:bg-slate-800/10'} transition-colors`}>
                          <td className={`sticky left-0 ${isLatest ? 'bg-slate-800/40' : 'bg-surface-900'} z-10 px-3 py-2 text-slate-300 font-semibold whitespace-nowrap`}>
                            {r.period}{isLatest && <span className="ml-1 text-emerald-500">●</span>}
                          </td>
                          <td className="text-right px-3 py-2 text-slate-400">{r.subscription ?? '—'}</td>
                          <td className="text-right px-3 py-2 text-slate-400">{r.profServices ?? '—'}</td>
                          <td className="text-right px-3 py-2 text-white font-semibold">{r.totalRev ?? '—'}</td>
                          <td className="text-right px-3 py-2 text-red-400">{r.costOfRev != null ? `(${r.costOfRev})` : '—'}</td>
                          <td className="text-right px-3 py-2 text-emerald-400">{r.grossProfit ?? '—'}</td>
                          <td className="text-right px-3 py-2 text-emerald-300">{r.grossMargin != null ? `${r.grossMargin}%` : '—'}</td>
                          <td className="text-right px-3 py-2 text-red-400">{r.opex != null ? `(${r.opex})` : '—'}</td>
                          <td className={`text-right px-3 py-2 ${r.opIncome >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {r.opIncome != null ? (r.opIncome < 0 ? `(${Math.abs(r.opIncome)})` : r.opIncome) : '—'}
                          </td>
                          <td className={`text-right px-3 py-2 ${r.opMargin >= 0 ? 'text-blue-300' : 'text-blue-400/60'}`}>
                            {r.opMargin != null ? `${r.opMargin}%` : '—'}
                          </td>
                          <td className={`text-right px-3 py-2 ${r.netMargin >= 0 ? 'text-violet-300' : 'text-violet-400/60'}`}>
                            {r.netMargin != null ? `${r.netMargin}%` : '—'}
                          </td>
                          <td className="text-right px-3 py-2 text-amber-400">{r.totalCapex ?? '—'}</td>
                          <td className="text-right px-3 py-2 text-amber-300">{r.capRatio != null ? `${r.capRatio}%` : '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Income Statement Snapshot */}
              <div className="flex items-center justify-between mt-6 mb-1">
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">利润表 · Q4 FY26</span>
                <button
                  onClick={() => {
                    const headers = [
                      { key: 'item', label: 'Item' },
                      { key: 'value', label: 'Value ($M)' },
                      { key: 'pct', label: '% of Revenue' },
                      { key: 'yoy', label: 'Y/Y Change' },
                    ];
                    downloadCSV(incomeSnapshot, headers, 'CRWD_income_Q4FY26.csv');
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Download size={12} /> CSV
                </button>
              </div>
              <div className="bg-surface-900/50 rounded-2xl border border-slate-800/50 overflow-hidden">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800/60">
                      <th className="text-left px-4 py-2.5 text-slate-500 font-semibold">科目</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">金额 ($M)</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">占收入%</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">Y/Y</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeSnapshot.map((r, i) => {
                      const isTotal = r.item.startsWith('Total') || r.item === 'Gross Profit' || r.item === 'Operating Loss';
                      return (
                        <tr key={i} className={`border-b border-slate-800/20 ${isTotal ? 'bg-slate-800/15' : ''}`}>
                          <td className={`px-4 py-2 ${isTotal ? 'text-white font-semibold' : 'text-slate-400'} ${r.item.match(/^(S&M|R&D|G&A)$/) ? 'pl-8' : ''}`}>{r.item}</td>
                          <td className={`text-right px-4 py-2 ${r.value < 0 ? 'text-red-400' : 'text-emerald-400'} ${isTotal ? 'font-semibold' : ''}`}>
                            {r.value < 0 ? `(${Math.abs(r.value)})` : r.value}
                          </td>
                          <td className="text-right px-4 py-2 text-slate-500">{r.pct}</td>
                          <td className={`text-right px-4 py-2 ${r.yoy.includes('+') ? 'text-emerald-400' : r.yoy.includes('-') ? 'text-red-400' : 'text-slate-600'}`}>{r.yoy || '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Balance Sheet Snapshot */}
              <div className="flex items-center justify-between mt-6 mb-1">
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">资产负债表 · Q4 FY26</span>
                <button
                  onClick={() => {
                    const headers = [
                      { key: 'item', label: 'Item' },
                      { key: 'value', label: 'Value ($M)' },
                      { key: 'category', label: 'Category' },
                    ];
                    downloadCSV(balanceSnapshot, headers, 'CRWD_balance_Q4FY26.csv');
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Download size={12} /> CSV
                </button>
              </div>
              <div className="bg-surface-900/50 rounded-2xl border border-slate-800/50 overflow-hidden">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800/60">
                      <th className="text-left px-4 py-2.5 text-slate-500 font-semibold">科目</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">金额 ($M)</th>
                      <th className="text-right px-4 py-2.5 text-slate-500 font-semibold">占总资产%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balanceSnapshot.map((r, i) => {
                      const isTotal = r.category.includes('total') || r.category === 'equity';
                      const isAsset = r.category.startsWith('asset');
                      const isLiab = r.category.startsWith('liability');
                      const pct = ((r.value / totalAssets) * 100).toFixed(1);
                      return (
                        <tr key={i} className={`border-b border-slate-800/20 ${isTotal ? 'bg-slate-800/15' : ''}`}>
                          <td className={`px-4 py-2 ${isTotal ? 'text-white font-semibold' : 'text-slate-400'}`}>{r.item}</td>
                          <td className={`text-right px-4 py-2 font-medium ${
                            r.category === 'equity' ? 'text-emerald-400' :
                            isAsset ? 'text-blue-400' : 'text-red-400'
                          } ${isTotal ? 'font-semibold' : ''}`}>
                            {r.value.toLocaleString()}
                          </td>
                          <td className="text-right px-4 py-2 text-slate-600">{pct}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>)}

          </div>

          {/* Disclaimer */}
          <div className="text-center text-xs text-slate-600 mt-8 pt-4 border-t border-slate-800/30">
            仅供参考，不构成投资建议 · 数据来源: CrowdStrike Q4 FY26 财报 · 部分数据为估算值
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
