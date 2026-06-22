'use client';

// ============================================================
// 【将来実装予定】音声入力フック（MVP版では未実装・完全スタブ）
//
// ■ MVP版の方針：外部APIは一切使用しない
//   - OpenAI Whisper API        → 未使用（課金発生のため）
//   - Google Cloud Speech-to-Text → 未使用（課金発生のため）
//   - Azure Cognitive Services  → 未使用（課金発生のため）
//
// ■ 将来の実装候補（いずれも要APIキー・課金あり）
//   Option A: ブラウザ標準 Web Speech API（無料・要ネット）
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//   Option B: OpenAI Whisper API（高精度・従量課金）
//     POST https://api.openai.com/v1/audio/transcriptions
//
// ■ 実装時の注意
//   - APIキーを .env.local に保存し、絶対にコミットしない
//   - サーバーサイドルート (app/api/) 経由で呼び出してキーを隠す
//   - speechTranscript フィールド（StudyRecord型）に結果を保存する
// ============================================================

export interface VoiceInputState {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
}

export interface VoiceInputActions {
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useVoiceInput(): VoiceInputState & VoiceInputActions {
  // MVP版：外部API不使用のため常に isSupported: false を返す
  return {
    isListening: false,
    transcript: '',
    error: null,
    isSupported: false,
    startListening: () => {
      // 【未実装】音声入力は将来実装予定（外部API課金を避けるためMVPでは無効）
    },
    stopListening: () => {},
    resetTranscript: () => {},
  };
}
