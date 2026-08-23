import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://quanheng-deadline.wudongbird.chatgpt.site'),
  title: '权衡 · 民事法律期限助手',
  description: '基于现行法律文件的中国大陆民事诉讼时效、除斥期间、担保与程序期限计算参考工具。',
  openGraph: {
    title: '权衡 · 民事法律期限助手',
    description: '诉讼时效、除斥期间和程序期限，每一步计算都能回到法条原文。',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '权衡法律期限助手' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '权衡 · 民事法律期限助手',
    description: '诉讼时效、除斥期间和程序期限，每一步计算都能回到法条原文。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
