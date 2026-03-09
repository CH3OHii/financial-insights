import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function ArticleCard({ href, ticker, company, period, date, tags, summary, accentColor }) {
  return (
    <Link href={href} className="group block">
      <article className="relative bg-surface-900/60 border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/70 hover:bg-surface-800/50 transition-all duration-300">
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
            >
              {ticker}
            </span>
            <span className="text-xs text-slate-500">{date}</span>
          </div>
          <ArrowUpRight
            size={16}
            className="text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </div>

        {/* Title */}
        <h2 className="font-display text-xl text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
          {company}
        </h2>
        <p className="text-sm text-slate-400 mb-3">{period}</p>

        {/* Summary */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
          {summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs bg-slate-800/80 text-slate-400 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
