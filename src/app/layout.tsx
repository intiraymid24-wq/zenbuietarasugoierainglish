import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: '瞬間英作文トレーニング',
  description: '毎日の英作文練習で英語力を伸ばす学習アプリ',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <main className="max-w-lg mx-auto pb-24 min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
