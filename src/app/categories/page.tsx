'use client';

import Link from 'next/link';
import { CATEGORY_META, LEVEL_LABEL } from '@/lib/constants';
import questionsData from '@/data/questions.json';
import { Question } from '@/types';

const questions = questionsData as Question[];

export default function CategoriesPage() {
  return (
    <div className="px-4 pt-8 space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">カテゴリ選択</h1>
        <p className="text-sm text-gray-500 mt-1">練習したいカテゴリを選んでください</p>
      </div>

      {/* 全カテゴリ練習 */}
      <Link href="/training?category=all">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg">すべての問題</p>
              <p className="text-indigo-200 text-sm mt-0.5">全 {questions.length} 問</p>
            </div>
            <span className="text-5xl">📚</span>
          </div>
        </div>
      </Link>

      {/* カテゴリ別 */}
      <div className="space-y-3">
        {CATEGORY_META.map((cat) => {
          const catQuestions = questions.filter((q) => q.category === cat.id);
          const beginnerCount = catQuestions.filter((q) => q.level === 'beginner').length;
          const interCount = catQuestions.filter((q) => q.level === 'intermediate').length;
          const advCount = catQuestions.filter((q) => q.level === 'advanced').length;

          return (
            <Link key={cat.id} href={`/training?category=${cat.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 active:bg-gray-50 transition-colors">
                {/* アイコン */}
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{cat.icon}</span>
                </div>

                {/* テキスト */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800">{cat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {beginnerCount > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {LEVEL_LABEL.beginner} {beginnerCount}問
                      </span>
                    )}
                    {interCount > 0 && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                        {LEVEL_LABEL.intermediate} {interCount}問
                      </span>
                    )}
                    {advCount > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        {LEVEL_LABEL.advanced} {advCount}問
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
