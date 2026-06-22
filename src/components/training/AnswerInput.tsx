'use client';

// ============================================================
// 回答入力コンポーネント
// MVP版：テキスト入力のみ（外部API・課金なし）
//
// 【将来実装予定】音声入力への拡張:
//   useVoiceInput フック（src/hooks/useVoiceInput.ts）を有効化して
//   <VoiceInputButton> をここに追加する。
//   ※ 外部API課金を避けるためMVPでは無効
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
        autoFocus={!disabled}
        className={[
          'w-full rounded-xl border-2 p-4 text-base',
          'resize-none outline-none transition-all duration-150',
          'placeholder:text-gray-300',
          disabled
            ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white border-gray-200 text-gray-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100',
        ].join(' ')}
      />

      {/* 音声入力 placeholder（将来実装予定） */}
      <button
        type="button"
        disabled
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                   border-2 border-dashed border-gray-200 text-gray-300
                   cursor-not-allowed select-none text-sm"
        title="音声入力は将来追加予定です"
      >
        <span className="text-lg">🎤</span>
        <span>音声入力は将来追加予定</span>
        <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full ml-1">
          準備中
        </span>
      </button>
    </div>
  );
}
