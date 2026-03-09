'use client';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-10 border-b border-slate-800/60">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
            <BarChart3 size={16} className="text-white" />
          </div>
          <div>
            <span className="font-display text-lg text-white tracking-tight">Financial Insights</span>
          </div>
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/" className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors font-medium">
            首页
          </Link>
        </nav>
      </div>
    </header>
  );
}
