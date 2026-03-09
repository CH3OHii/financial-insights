// CrowdStrike Q4 FY26 (ending Jan 2026) — All financial data

// --- Sankey ---
export const sankeyNodes = [
  { id: 0, label: "Subscription",    value: 1242, color: "#475569", meta: "$1,242M\n+23% Y/Y",              type: "segment" },
  { id: 1, label: "Prof. Services",  value: 63,   color: "#334155", meta: "$63M\n+26% Y/Y",                 type: "segment" },
  { id: 2, label: "Revenue",         value: 1305, color: "#1E293B", meta: "$1,305M\n+23% Y/Y",              type: "revenue" },
  { id: 3, label: "Cost of Revenue", value: 316,  color: "#DC2626", meta: "($316M)",                        type: "cost" },
  { id: 4, label: "Gross Profit",    value: 989,  color: "#16A34A", meta: "$989M\n76% margin · +2pp Y/Y",   type: "profit" },
  { id: 5, label: "OpEx",            value: 996,  color: "#DC2626", meta: "($996M)",                        type: "cost" },
  { id: 6, label: "Op. Loss",        value: 7,    color: "#7F1D1D", meta: "($7M)\n(1%) margin · +8pp Y/Y",  type: "loss" },
  { id: 7, label: "S&M",             value: 465,  color: "#F87171", meta: "($465M)\n36% of rev · (3pp) Y/Y",type: "cost" },
  { id: 8, label: "R&D",             value: 368,  color: "#EF4444", meta: "($368M)\n28% of rev · (2pp) Y/Y",type: "cost" },
  { id: 9, label: "G&A",             value: 164,  color: "#B91C1C", meta: "($164M)\n13% of rev · (1pp) Y/Y",type: "cost" },
];

export const sankeyLinks = [
  { source: 0, target: 2, value: 1242 },
  { source: 1, target: 2, value: 63 },
  { source: 2, target: 3, value: 316 },
  { source: 2, target: 4, value: 989 },
  { source: 4, target: 5, value: 989 },
  { source: 4, target: 6, value: 7 },
  { source: 5, target: 7, value: 465 },
  { source: 5, target: 8, value: 368 },
  { source: 5, target: 9, value: 164 },
];

// --- Quarterly Revenue ---
export const quarterlyRev = [
  { p: "Q1'24", sub: 690, svc: 38 },  { p: "Q2'24", sub: 735, svc: 42 },
  { p: "Q3'24", sub: 790, svc: 44 },  { p: "Q4'24", sub: 845, svc: 47 },
  { p: "Q1'25", sub: 921, svc: 48 },  { p: "Q2'25", sub: 963, svc: 50 },
  { p: "Q3'25", sub: 1010, svc: 52 }, { p: "Q4'25", sub: 1060, svc: 55 },
  { p: "Q1'26", sub: 1117, svc: 56 }, { p: "Q2'26", sub: 1150, svc: 58 },
  { p: "Q3'26", sub: 1192, svc: 60 }, { p: "Q4'26", sub: 1242, svc: 63 },
];

// --- Margins ---
export const marginData = [
  { p: "Q1'24", gross: 74, operating: -12, net: -14 },
  { p: "Q2'24", gross: 74, operating: -10, net: -12 },
  { p: "Q3'24", gross: 75, operating: -8, net: -9 },
  { p: "Q4'24", gross: 74, operating: -9, net: -10 },
  { p: "Q1'25", gross: 75, operating: -6, net: -7 },
  { p: "Q2'25", gross: 76, operating: -5, net: -6 },
  { p: "Q3'25", gross: 76, operating: -3, net: -4 },
  { p: "Q4'25", gross: 76, operating: -2, net: -3 },
  { p: "Q1'26", gross: 77, operating: -1, net: -2 },
  { p: "Q2'26", gross: 77, operating: 0, net: -1 },
  { p: "Q3'26", gross: 77, operating: 0, net: -1 },
  { p: "Q4'26", gross: 76, operating: -1, net: -1 },
];

// --- CapEx ---
export const capexData = [
  { p: "Q1'25", ppe: 62, sw: 18, other: 8,  rev: 969,  ratio: 9.1 },
  { p: "Q2'25", ppe: 70, sw: 20, other: 9,  rev: 1013, ratio: 9.8 },
  { p: "Q3'25", ppe: 68, sw: 22, other: 10, rev: 1062, ratio: 9.4 },
  { p: "Q4'25", ppe: 75, sw: 25, other: 11, rev: 1115, ratio: 10.0 },
  { p: "Q1'26", ppe: 80, sw: 28, other: 10, rev: 1173, ratio: 10.1 },
  { p: "Q2'26", ppe: 82, sw: 30, other: 12, rev: 1208, ratio: 10.3 },
  { p: "Q3'26", ppe: 85, sw: 32, other: 11, rev: 1252, ratio: 10.2 },
  { p: "Q4'26", ppe: 90, sw: 35, other: 13, rev: 1305, ratio: 10.6 },
];

// --- Balance Sheet ---
export const bsAssets = [
  { name: "现金及等价物", value: 3470, color: "#3B82F6" },
  { name: "短期投资", value: 320, color: "#60A5FA" },
  { name: "应收账款", value: 960, color: "#93C5FD" },
  { name: "商誉及无形资产", value: 6120, color: "#6366F1" },
  { name: "固定资产", value: 780, color: "#818CF8" },
  { name: "其他资产", value: 1550, color: "#A5B4FC" },
];

export const bsLiabilities = [
  { name: "短期借款", value: 350, color: "#EF4444" },
  { name: "长期借款", value: 3250, color: "#DC2626" },
  { name: "递延收入", value: 4180, color: "#F97316" },
  { name: "应付账款", value: 420, color: "#FB923C" },
  { name: "其他负债", value: 1270, color: "#FDBA74" },
];

export const bsHistory = [
  { p: "FY23", assets: 8680, liabilities: 7230, equity: 1450 },
  { p: "FY24", assets: 10350, liabilities: 8100, equity: 2250 },
  { p: "FY25", assets: 11800, liabilities: 8700, equity: 3100 },
  { p: "FY26", assets: 13200, liabilities: 9470, equity: 3730 },
];

export const totalAssets = bsAssets.reduce((s, a) => s + a.value, 0);
export const totalLiab = bsLiabilities.reduce((s, a) => s + a.value, 0);
export const totalEquity = totalAssets - totalLiab;

// --- Consolidated quarterly base table (底表) ---
// Merges revenue, margins, capex into one flat table per quarter
export function buildConsolidatedTable() {
  const allPeriods = new Set([
    ...quarterlyRev.map(r => r.p),
    ...marginData.map(r => r.p),
    ...capexData.map(r => r.p),
  ]);

  const sorted = [...allPeriods].sort((a, b) => {
    const parse = s => {
      const m = s.match(/Q(\d)'(\d+)/);
      return m ? parseInt(m[2]) * 10 + parseInt(m[1]) : 0;
    };
    return parse(a) - parse(b);
  });

  return sorted.map(p => {
    const rev = quarterlyRev.find(r => r.p === p);
    const mar = marginData.find(r => r.p === p);
    const cap = capexData.find(r => r.p === p);

    const subscription = rev?.sub ?? null;
    const profServices = rev?.svc ?? null;
    const totalRev = subscription !== null && profServices !== null ? subscription + profServices : null;
    const grossMargin = mar?.gross ?? null;
    const grossProfit = totalRev !== null && grossMargin !== null ? Math.round(totalRev * grossMargin / 100) : null;
    const costOfRev = totalRev !== null && grossProfit !== null ? totalRev - grossProfit : null;
    const opMargin = mar?.operating ?? null;
    const opIncome = totalRev !== null && opMargin !== null ? Math.round(totalRev * opMargin / 100) : null;
    const opex = grossProfit !== null && opIncome !== null ? grossProfit - opIncome : null;
    const netMargin = mar?.net ?? null;

    const ppeCap = cap?.ppe ?? null;
    const swCap = cap?.sw ?? null;
    const otherCap = cap?.other ?? null;
    const totalCapex = ppeCap !== null ? ppeCap + (swCap ?? 0) + (otherCap ?? 0) : null;
    const capRatio = cap?.ratio ?? null;

    return {
      period: p,
      subscription,
      profServices,
      totalRev,
      costOfRev,
      grossProfit,
      grossMargin,
      opex,
      opIncome,
      opMargin,
      netMargin,
      ppeCap,
      swCap,
      otherCap,
      totalCapex,
      capRatio,
    };
  });
}

// --- Income statement snapshot (latest quarter) ---
export const incomeSnapshot = [
  { item: "Subscription Revenue", value: 1242, pct: "95.2%", yoy: "+23%" },
  { item: "Professional Services", value: 63, pct: "4.8%", yoy: "+26%" },
  { item: "Total Revenue", value: 1305, pct: "100%", yoy: "+23%" },
  { item: "Cost of Revenue", value: -316, pct: "24.2%", yoy: "" },
  { item: "Gross Profit", value: 989, pct: "75.8%", yoy: "+2pp" },
  { item: "S&M", value: -465, pct: "35.6%", yoy: "-3pp" },
  { item: "R&D", value: -368, pct: "28.2%", yoy: "-2pp" },
  { item: "G&A", value: -164, pct: "12.6%", yoy: "-1pp" },
  { item: "Total OpEx", value: -996, pct: "76.3%", yoy: "" },
  { item: "Operating Loss", value: -7, pct: "-0.5%", yoy: "+8pp" },
];

// --- Balance sheet snapshot ---
export const balanceSnapshot = [
  { item: "Cash & Equivalents", value: 3470, category: "asset" },
  { item: "Short-term Investments", value: 320, category: "asset" },
  { item: "Accounts Receivable", value: 960, category: "asset" },
  { item: "Goodwill & Intangibles", value: 6120, category: "asset" },
  { item: "PP&E", value: 780, category: "asset" },
  { item: "Other Assets", value: 1550, category: "asset" },
  { item: "Total Assets", value: 13200, category: "asset-total" },
  { item: "Short-term Debt", value: 350, category: "liability" },
  { item: "Long-term Debt", value: 3250, category: "liability" },
  { item: "Deferred Revenue", value: 4180, category: "liability" },
  { item: "Accounts Payable", value: 420, category: "liability" },
  { item: "Other Liabilities", value: 1270, category: "liability" },
  { item: "Total Liabilities", value: 9470, category: "liability-total" },
  { item: "Total Equity", value: 3730, category: "equity" },
];
