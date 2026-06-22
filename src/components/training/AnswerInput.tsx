'use client';

// ============================================================
// 回答入力コンポーネント
//
// MVP版：テキスト入力のみ（外部API・課金なし）
//
// 【将来実装予定】音声入力への拡張方法：
//   1. useVoiceInput フック（src/hooks/useVoiceInput.ts）を有効化
//   2. このコンポーネントに <VoiceInputButton> を追加
//   3. 音声認識結果を onChange に渡す
//   ※ 音声認識には外部APIまたはWeb Speech APIが必要（MVP版では無効）
// ============================================================

interface AnswerInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function AnswerInput({
  value,
  onChange,
  disabled = false,
  placeholder = '英語を入力してください…',
}: AnswerInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-600 block">
        あなたの英作文
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        rows={3}
        className={[
          'w-full rounded-xl border-2 p-4 text-base',
          'resize-none outline-none transition-all duration-150',
          'placeholder:text-gray-300',
          disabled
            ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100',
        ].join(' ')}
      />
      {/*
        【将来実装予定】音声入力ボタン
        MVP版では外部API課金を避けるため未実装。
        実装時は useVoiceInput フックを有効化してここに追加する。
        <VoiceInputButton onTranscript={onChange} />
      */}
    </div>
  );
}
