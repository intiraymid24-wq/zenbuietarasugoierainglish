'use client';

import Link from 'next/link';
import StatsCard from '@/components/home/StatsCard';
import { CATEGORY_META } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="px-4 pt-8 space-y-6">
      {/* ヘッダー */}
      <div>
        <p className="text-sm text-indigo-500 font-semibold mb-1">10秒で差をつけろ！</p>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
          瞬<span className="text-indigo-600">作</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">瞬間英作文トレーニング</p>
      </div>

      {/* 統計カード */}
      <StatsCard />

      {/* クイックスタートボタン */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          クイックスタート
        </h2>
        <Link href="/training?category=all">
          <div className="bg-indigo-600 rounded-2xl p-5 flex items-center justify-between shadow-md active:scale-95 transition-transform">
            <div>
              <p className="text-white font-bold text-lg">全カテゴリから練習</p>
              <p className="text-indigo-200 text-sm mt-0.5">ランダムに出題されます</p>
            </div>
            <span className="text-4xl">🚀</span>
          </div>
        </Link>
        <Link href="/training?category=toeic">
          <div className="bg-violet-600 rounded-2xl p-5 flex items-center justify-between shadow-md active:scale-95 transition-transform">
            <div>
              <p className="text-white font-bold text-lg">TOEIC集中練習</p>
              <p className="text-violet-200 text-sm mt-0.5">ビジネス英語 61問</p>
            </div>
            <span className="text-4xl">📝</span>
          </div>
        </Link>
        <Link href="/review">
          <div className="bg-orange-500 rounded-2xl p-5 flex items-center justify-between shadow-md active:scale-95 transition-transform">
            <div>
              <p className="text-white font-bold text-lg">復習リストから練習</p>
              <p className="text-orange-100 text-sm mt-0.5">「微妙」「できなかった」問題</p>
            </div>
            <span className="text-4xl">🔁</span>
          </div>
        </Link>
      </div>

      {/* カテゴリ一覧 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            カテゴリ別練習
          </h2>
          <Link href="/categories" className="text-sm text-indigo-500 font-medium">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORY_META.slice(0, 4).map((cat) => (
            <Link key={cat.id} href={`/training?category=${cat.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 active:bg-gray-50 transition-colors">
                <span className="text-3xl">{cat.icon}</span>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{cat.label}</p>
                  <p className="text-xs text-gray-400 truncate">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 学習のヒント */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <p className="text-sm font-bold text-blue-700 mb-1">💡 10秒チャレンジのコツ</p>
        <p className="text-sm text-blue-600">
          声に出しながら入力すると効果的！
          答えを見てからも必ず声に出して繰り返そう。
        </p>
      </div>

      {/* MVPバッジ */}
      <div className="flex justify-center">
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
          MVP版：外部API不使用 / APIキー不要 / ローカル保存のみ
        </span>
      </div>
      <div className="h-2" />
    </div>
  );
}
