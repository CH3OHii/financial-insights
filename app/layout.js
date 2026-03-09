import './globals.css';

export const metadata = {
  title: 'Financial Insights — 财经数据可视化',
  description: '深度财报分析与交互式数据可视化 | Earnings analysis with interactive dashboards',
  openGraph: {
    title: 'Financial Insights',
    description: '深度财报分析与交互式数据可视化',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="noise-bg min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
