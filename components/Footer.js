export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800/40 mt-auto">
      <div className="max-w-5xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-slate-600">
          © 2026 Financial Insights. 仅供参考，不构成投资建议。
        </p>
        <p className="text-xs text-slate-700">
          Built with Next.js & Recharts
        </p>
      </div>
    </footer>
  );
}
