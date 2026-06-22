'use client';

import Link from 'next/link';
import { CATEGORY_META, TOEIC_SUBCATEGORY_META, LEVEL_LABEL } from '@/lib/constants';
import questionsData from '@/data/questions.json';
import { Question } from '@/types';

const questions = questionsData as Question[];

export default function CategoriesPage() {
  return (
    <div className="px-4 pt-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">カテゴリ選択</h1>
        <p className="text-sm text-gray-500 mt-1">練習したいカテゴリを選んでください</p>
      </div>

      {/* 全問題 */}
      <Link href="/training?category=all">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 shadow-md active:scale-95 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg">すべての問題</p>
              <p className="text-indigo-200 text-sm mt-0.5">全 {questions.length} 問・ランダム出題</p>
            </div>
            <span className="text-5xl">📚</span>
          </div>
        </div>
      </Link>

      {/* TOEICカテゴリ（サブカテゴリ付き） */}
      <div className="space-y-2">
        <Link href="/training?category=toeic">
          <div className="bg-violet-600 rounded-2xl p-4 shadow-md active:scale-95 transition-transform flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-base flex items-center gap-2">
                📝 TOEIC全カテゴリ
              </p>
              <p className="text-violet-200 text-xs mt-0.5">
                {questions.filter((q) => q.category === 'toeic').length}問・10サブカテゴリ
              </p>
            </div>
            <span className="text-white text-xl">›</span>
          </div>
        </Link>

        {/* TOEICサブカテゴリ */}
        <div className="grid grid-cols-2 gap-2 pl-2">
          {TOEIC_SUBCATEGORY_META.map((sub) => {
            const count = questions.filter(
              (q) => q.category === 'toeic' && q.subCategory === sub.id
            ).length;
            return (
              <Link key={sub.id} href={`/training?category=toeic&sub=${sub.id}`}>
                <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 flex items-center gap-2 active:bg-violet-100 transition-colors">
                  <span className="text-xl">{sub.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-violet-700 truncate">{sub.label}</p>
                    <p className="text-xs text-violet-400">{count}問</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* その他のカテゴリ */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">その他のカテゴリ</h2>
        {CATEGORY_META.filter((cat) => cat.id !== 'toeic').map((cat) => {
          const catQs        = questions.filter((q) => q.category === cat.id);
          const beginnerCnt  = catQs.filter((q) => q.level === 'beginner').length;
          const interCnt     = catQs.filter((q) => q.level === 'intermediate').length;
          const advCnt       = catQs.filter((q) => q.level === 'advanced').length;
          return (
            <Link key={cat.id} href={`/training?category=${cat.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 active:bg-gray-50 transition-colors">
                <div className={`w-13 h-13 w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800">{cat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {beginnerCnt > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {LEVEL_LABEL.beginner} {beginnerCnt}問
                      </span>
                    )}
                    {interCnt > 0 && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                        {LEVEL_LABEL.intermediate} {interCnt}問
                      </span>
                    )}
                    {advCnt > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        {LEVEL_LABEL.advanced} {advCnt}問
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-gray-300 text-xl flex-shrink-0">›</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
