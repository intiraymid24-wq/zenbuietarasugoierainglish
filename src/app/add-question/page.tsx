'use client';

import { useState } from 'react';
import { Category, Level, Question } from '@/types';
import { CATEGORY_META, LEVEL_LABEL } from '@/lib/constants';
import { saveCustomQuestion } from '@/lib/storage';
import Button from '@/components/ui/Button';

const INITIAL: {
  promptJapanese: string;
  modelAnswer: string;
  category: Category;
  level: Level;
  grammarPoint: string;
  explanation: string;
} = {
  promptJapanese: '',
  modelAnswer:    '',
  category:       'daily',
  level:          'beginner',
  grammarPoint:   '',
  explanation:    '',
};

export default function AddQuestionPage() {
  const [form, setForm]       = useState(INITIAL);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState('');

  const update = <K extends keyof typeof INITIAL>(key: K, val: typeof INITIAL[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
    setError('');
  };

  const handleSave = () => {
    if (!form.promptJapanese.trim()) { setError('日本語文を入力してください'); return; }
    if (!form.modelAnswer.trim())    { setError('模範解答を入力してください'); return; }

    const question: Question = {
      id:              `custom-${Date.now()}`,
      promptJapanese:  form.promptJapanese.trim(),
      modelAnswers:    form.modelAnswer.split('\n').map((s) => s.trim()).filter(Boolean),
      category:        form.category,
      level:           form.level,
      grammarPoint:    form.grammarPoint.trim() || '（未設定）',
      scene:           '自作問題',
      explanation:     form.explanation.trim() || undefined,
    };

    saveCustomQuestion(question);
    setSaved(true);
    setForm(INITIAL);
  };

  return (
    <div className="px-4 pt-8 pb-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">問題追加</h1>
        <p className="text-sm text-gray-500 mt-1">
          自分で問題を作ってトレーニングに追加できます
        </p>
      </div>

      {/* フォーム */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">

        {/* 日本語文 */}
        <div className="px-5 py-4">
          <label className="text-sm font-bold text-gray-700 block mb-2">
            日本語文 <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={2}
            value={form.promptJapanese}
            onChange={(e) => update('promptJapanese', e.target.value)}
            placeholder="例: 会議は3時に始まります。"
            className="w-full rounded-xl border-2 border-gray-200 p-3 text-base resize-none outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* 模範解答 */}
        <div className="px-5 py-4">
          <label className="text-sm font-bold text-gray-700 block mb-2">
            模範解答 <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={3}
            value={form.modelAnswer}
            onChange={(e) => update('modelAnswer', e.target.value)}
            placeholder={"例: The meeting starts at 3.\n（複数ある場合は改行で区切る）"}
            className="w-full rounded-xl border-2 border-gray-200 p-3 text-base resize-none outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <p className="text-xs text-gray-400 mt-1">複数の解答は改行で区切ってください</p>
        </div>

        {/* カテゴリ */}
        <div className="px-5 py-4">
          <label className="text-sm font-bold text-gray-700 block mb-2">カテゴリ</label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value as Category)}
            className="w-full rounded-xl border-2 border-gray-200 p-3 text-base outline-none focus:border-indigo-400 bg-white"
          >
            {CATEGORY_META.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* レベル */}
        <div className="px-5 py-4">
          <label className="text-sm font-bold text-gray-700 block mb-2">レベル</label>
          <div className="grid grid-cols-3 gap-2">
            {(['beginner', 'intermediate', 'advanced'] as Level[]).map((lv) => (
              <button
                key={lv}
                type="button"
                onClick={() => update('level', lv)}
                className={[
                  'py-2 rounded-xl text-sm font-bold border-2 transition-colors',
                  form.level === lv
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300',
                ].join(' ')}
              >
                {LEVEL_LABEL[lv]}
              </button>
            ))}
          </div>
        </div>

        {/* 文法ポイント */}
        <div className="px-5 py-4">
          <label className="text-sm font-bold text-gray-700 block mb-2">文法ポイント</label>
          <input
            type="text"
            value={form.grammarPoint}
            onChange={(e) => update('grammarPoint', e.target.value)}
            placeholder="例: 現在形で予定を表す"
            className="w-full rounded-xl border-2 border-gray-200 p-3 text-base outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* メモ（explanation） */}
        <div className="px-5 py-4">
          <label className="text-sm font-bold text-gray-700 block mb-2">メモ・解説</label>
          <textarea
            rows={3}
            value={form.explanation}
            onChange={(e) => update('explanation', e.target.value)}
            placeholder="自分用のメモや解説を書いておけます（省略可）"
            className="w-full rounded-xl border-2 border-gray-200 p-3 text-base resize-none outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* エラー */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          ⚠️ {error}
        </p>
      )}

      {/* 保存完了 */}
      {saved && (
        <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          ✅ 問題を保存しました！トレーニング画面に反映されます。
        </p>
      )}

      <Button variant="primary" size="lg" fullWidth onClick={handleSave}>
        問題を保存する
      </Button>

      {/* 注意書き */}
      <div className="bg-gray-50 rounded-2xl p-4 text-xs text-gray-400 space-y-1">
        <p>📱 保存先：端末内のlocalStorageのみ（外部送信なし）</p>
        <p>🔒 外部API不使用・課金なし</p>
        <p>⚠️ ブラウザのデータを削除すると問題も消えます</p>
      </div>
    </div>
  );
}
