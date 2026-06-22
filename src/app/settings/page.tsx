'use client';

import { useEffect, useState } from 'react';
import { AppSettings } from '@/types';
import { loadData, updateSettings } from '@/lib/storage';
import { STORAGE_KEY } from '@/lib/constants';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    dailyGoal: 20,
    showRomaji: false,
    autoReveal: false,
    soundEnabled: false,
    theme: 'light',
  });

  useEffect(() => {
    const data = loadData();
    setSettings(data.settings);
  }, []);

  const handleChange = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    updateSettings(next);
  };

  const handleClearData = () => {
    if (typeof window === 'undefined') return;
    if (confirm('学習履歴をすべて削除してもよいですか？この操作は元に戻せません。')) {
      localStorage.removeItem(STORAGE_KEY);
      alert('データを削除しました。');
      window.location.reload();
    }
  };

  return (
    <div className="px-4 pt-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">設定</h1>
        <p className="text-sm text-gray-500 mt-1">アプリの動作をカスタマイズ</p>
      </div>

      {/* 学習設定 */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">学習設定</h2>
        </div>

        {/* 1日の目標 */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">1日の目標問題数</p>
              <p className="text-xs text-gray-400 mt-0.5">毎日これだけ練習しよう</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 active:bg-gray-300"
                onClick={() => handleChange('dailyGoal', Math.max(5, settings.dailyGoal - 5))}
              >
                −
              </button>
              <span className="text-lg font-bold text-indigo-600 w-10 text-center">
                {settings.dailyGoal}
              </span>
              <button
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 active:bg-gray-300"
                onClick={() => handleChange('dailyGoal', Math.min(100, settings.dailyGoal + 5))}
              >
                ＋
              </button>
            </div>
          </div>
        </div>

        {/* 自動答え表示 */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">入力後に自動で答えを表示</p>
              <p className="text-xs text-gray-400 mt-0.5">ボタンを押さずに答えを表示</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.autoReveal}
                onChange={(e) => handleChange('autoReveal', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
            </label>
          </div>
        </div>
      </section>

      {/* 将来の機能（MVP版では無効） */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">将来追加予定の機能</h2>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-gray-500">🎤 音声入力・発話文字起こし</p>
              <p className="text-xs text-gray-400 mt-0.5">
                声で英作文を入力する機能。
                <br />
                <span className="text-orange-500 font-medium">
                  現在は未実装。外部音声APIの課金が発生するためMVPでは無効。
                </span>
              </p>
            </div>
            <span className="text-xs bg-orange-50 text-orange-400 border border-orange-200 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
              未実装
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-gray-500">🤖 AI添削・意味判定</p>
              <p className="text-xs text-gray-400 mt-0.5">
                AIが英作文を採点・フィードバックする機能。
                <br />
                <span className="text-orange-500 font-medium">
                  現在は未実装。OpenAI等のLLM APIの課金が発生するためMVPでは無効。
                </span>
              </p>
            </div>
            <span className="text-xs bg-orange-50 text-orange-400 border border-orange-200 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
              未実装
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-gray-500">💬 独り言英会話モード</p>
              <p className="text-xs text-gray-400 mt-0.5">
                AIと英語でフリートーク練習する機能。
                <br />
                <span className="text-orange-500 font-medium">
                  現在は未実装。音声合成・LLM APIの課金が発生するためMVPでは無効。
                </span>
              </p>
            </div>
            <span className="text-xs bg-orange-50 text-orange-400 border border-orange-200 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
              未実装
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-gray-500">📈 発話スピード測定</p>
              <p className="text-xs text-gray-400 mt-0.5">
                1問あたりの発話速度を計測する機能。
                <br />
                <span className="text-orange-500 font-medium">
                  現在は未実装（responseTimeフィールドは準備済み）。
                </span>
              </p>
            </div>
            <span className="text-xs bg-orange-50 text-orange-400 border border-orange-200 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
              未実装
            </span>
          </div>
        </div>
      </section>

      {/* MVPステータス・課金情報 */}
      <section className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <div>
            <p className="font-bold text-green-800 text-sm mb-2">
              MVP版：完全無料・外部API不使用
            </p>
            <ul className="text-xs text-green-700 space-y-1">
              <li>✅ 外部APIキー：不要</li>
              <li>✅ クラウドサービス：不使用</li>
              <li>✅ データ保存：端末内のlocalStorageのみ</li>
              <li>✅ 通信：なし（インターネット接続不要）</li>
              <li>✅ アカウント登録：不要</li>
            </ul>
            <p className="text-xs text-green-600 mt-2 border-t border-green-200 pt-2">
              未使用API：OpenAI・Whisper・Google Cloud Speech・
              Azure Cognitive・Firebase・Supabase・Stripe
            </p>
          </div>
        </div>
      </section>

      {/* データ管理 */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">データ管理</h2>
        </div>
        <div className="px-5 py-4">
          <button
            onClick={handleClearData}
            className="w-full py-3 rounded-xl text-red-500 border-2 border-red-200 font-bold hover:bg-red-50 active:bg-red-100 transition-colors"
          >
            学習データをすべて削除
          </button>
        </div>
      </section>

      {/* バージョン情報 */}
      <div className="text-center text-xs text-gray-300 pb-4 space-y-1">
        <p>瞬間英作文トレーニング v1.0.0 (MVP)</p>
        <p>外部API不使用 / APIキー不要 / ローカル保存のみ</p>
      </div>
    </div>
  );
}
