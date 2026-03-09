import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { TrendingUp } from 'lucide-react';

const articles = [
  {
    href: '/analysis/nvidia-q4-fy26',
    ticker: 'NVDA', company: 'NVIDIA — AI芯片之王', period: 'Q4 FY2026 · 截至2026年1月',
    date: 'Feb 2026', accentColor: '#76B900',
    tags: ['Sankey', 'Data Center', 'Blackwell', '半导体'],
    summary: '收入$681亿(+73%)，毛利率回升至75%。Data Center占91%，Q1指引$780亿远超预期。FY26净利$1201亿。',
  },
  {
    href: '/analysis/apple-q1-fy26',
    ticker: 'AAPL', company: 'Apple — 创纪录假日季', period: 'Q1 FY2026 · 截至2025年12月',
    date: 'Jan 2026', accentColor: '#A1A1AA',
    tags: ['iPhone', 'Services', '大中华区'],
    summary: '收入$1438亿(+16%)创新高。iPhone $853亿(+23%)，大中华区暴涨38%。Services持续$300亿新高。',
  },
  {
    href: '/analysis/alphabet-q4-2025',
    ticker: 'GOOGL', company: 'Alphabet — AI驱动云加速', period: 'Q4 2025 · 截至2025年12月',
    date: 'Feb 2026', accentColor: '#4285F4',
    tags: ['Cloud', 'Search', 'Gemini', 'CapEx'],
    summary: '收入$1138亿(+18%)，年收入首超$4000亿。Cloud加速至+48%。2026 CapEx $1750-1850亿翻倍级增长。',
  },
  {
    href: '/analysis/crowdstrike-q4-fy26',
    ticker: 'CRWD', company: 'CrowdStrike — AI安全平台', period: 'Q4 FY26 · 截至2026年1月',
    date: 'Mar 2026', accentColor: '#EF4444',
    tags: ['Sankey', 'SaaS', 'ARR', '运营杠杆'],
    summary: '收入$13.05亿(+23%)，ARR $52.5亿。毛利率76%但运营仍微亏，费用率全面收缩，盈利拐点将至。',
  },
  {
    href: '/analysis/pdd-q4-2024',
    ticker: 'PDD', company: '拼多多 — 跨境电商引擎', period: 'Q4 2024 · 截至2024年12月',
    date: 'Mar 2025', accentColor: '#F04438',
    tags: ['Temu', '电商', '轻资产', '现金流'],
    summary: '收入¥1106亿(+24%)，FY24全年+59%。交易服务超越广告成第一收入。现金¥3316亿，P/E 10x。',
  },
  {
    href: '/analysis/berkshire-fy2025',
    ticker: 'BRK.B', company: 'Berkshire Hathaway — 后Buffett时代', period: 'FY 2025 · 截至2025年12月',
    date: 'Mar 2026', accentColor: '#1E3A5F',
    tags: ['保险', '现金储备', '价值投资'],
    summary: '全年营业利润$445亿(-6%)。现金$3733亿创新高，全年零回购。Greg Abel接任CEO。',
  },
  {
    href: '/analysis/sungrow-fy2024',
    ticker: '300274', company: '阳光电源 — 光储龙头', period: 'FY 2024 · 截至2024年12月',
    date: 'Apr 2025', accentColor: '#F59E0B',
    tags: ['储能', '光伏', '海外', '新能源'],
    summary: '营收¥779亿(+8%)，净利¥110亿(+17%)。储能+40%成第二增长曲线。海外贡献63%毛利。',
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-5 pt-16 pb-12">
          <div className="animate-fade-up opacity-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-emerald-500/60" />
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-medium">
                深度财报分析
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight mb-4">
              Financial Insights
            </h1>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              交互式财报可视化与数据驱动的投资分析。
              <br className="hidden sm:block" />
              涵盖利润流向、资本支出、资产负债结构等多维度拆解。
            </p>
          </div>
        </section>

        {/* Article Grid */}
        <section className="max-w-5xl mx-auto px-5 pb-20">
          <div className="flex items-center gap-2 mb-6 animate-fade-up opacity-0 stagger-2">
            <TrendingUp size={14} className="text-slate-500" />
            <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              最新分析 Latest
            </span>
            <div className="h-px flex-1 bg-slate-800/60" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((article, i) => (
              <div
                key={article.href}
                className={`animate-fade-up opacity-0 stagger-${i + 3}`}
              >
                <ArticleCard {...article} />
              </div>
            ))}

            {/* More coming soon */}
            <div className="animate-fade-up opacity-0 stagger-5">
              <div className="border border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center mb-3">
                  <span className="text-slate-600 text-lg">+</span>
                </div>
                <p className="text-sm text-slate-600">更多分析即将推出</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
