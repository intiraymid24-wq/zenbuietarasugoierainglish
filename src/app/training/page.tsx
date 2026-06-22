'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState, Suspense } from 'react';
import questionsData from '@/data/questions.json';
import { Question } from '@/types';
import { CATEGORY_META, TOEIC_SUBCATEGORY_META, TIMER_TARGETS } from '@/lib/constants';
import { useStudySession } from '@/hooks/useStudySession';
import { useTimer } from '@/hooks/useTimer';
import { getCustomQuestions } from '@/lib/storage';
import ProgressBar from '@/components/ui/ProgressBar';
import QuestionCard from '@/components/training/QuestionCard';
import AnswerInput from '@/components/training/AnswerInput';
import ModelAnswer from '@/components/training/ModelAnswer';
import SelfRatingButtons from '@/components/training/SelfRatingButtons';
import SessionComplete from '@/components/training/SessionComplete';
import Button from '@/components/ui/Button';

const builtinQuestions = questionsData as Question[];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function TrainingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') ?? 'all';
  const sub      = searchParams.get('sub') ?? null;

  const [customQs, setCustomQs] = useState<Question[]>([]);
  useEffect(() => { setCustomQs(getCustomQuestions()); }, []);

  const allQuestions = useMemo(
    () => [...builtinQuestions, ...customQs],
    [customQs]
  );

  const questions = useMemo(() => {
    let filtered = category === 'all'
      ? allQuestions
      : allQuestions.filter((q) => q.category === category);
    if (sub) filtered = filtered.filter((q) => q.subCategory === sub);
    return shuffle(filtered);
  }, [category, sub, allQuestions]);

  const {
    currentQuestion, currentIndex, totalCount, progress,
    showAnswer, userAnswer, setUserAnswer,
    completed, sessionResults, handleReveal, handleRate, reset,
  } = useStudySession({ questions });

  // タイマー目安時間
  const targetSeconds = useMemo(() => {
    if (!currentQuestion) return null;
    if (currentQuestion.category === 'toeic') return TIMER_TARGETS.toeic;
    return TIMER_TARGETS[currentQuestion.level];
  }, [currentQuestion]);

  const timer = useTimer(targetSeconds);

  // 問題が変わったらタイマーをリスタート
  useEffect(() => {
    if (!showAnswer) timer.start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // ページトップへスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  // 答えを見るときにタイマーを止める
  const handleRevealWithTimer = () => {
    timer.stop();
    handleReveal();
  };

  // 評価時にタイム情報も渡す
  const handleRateWithTimer = (rating: Parameters<typeof handleRate>[0]) => {
    handleRate(rating, timer.elapsed, !timer.isOverTime);
    timer.reset();
  };

  const categoryMeta    = CATEGORY_META.find((c) => c.id === category);
  const subCategoryMeta = sub ? TOEIC_SUBCATEGORY_META.find((s) => s.id === sub) : null;

  if (questions.length === 0) {
    return (
      <div className="px-4 pt-8 text-center space-y-4">
        <p className="text-5xl">😅</p>
        <p className="text-gray-600">このカテゴリに問題がありません</p>
        <Button variant="primary" onClick={() => router.back()}>戻る</Button>
      </div>
    );
  }

  if (completed) {
    return <SessionComplete results={sessionResults} onRestart={reset} />;
  }

  return (
    <div className="px-4 pt-6 space-y-4">
      {/* ナビゲーション */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-600 text-sm p-1 -ml-1 flex-shrink-0"
        >
          ‹ 戻る
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">
              {categoryMeta?.icon} {categoryMeta?.label ?? 'すべて'}
              {subCategoryMeta && ` › ${subCategoryMeta.icon} ${subCategoryMeta.label}`}
            </span>
            <span className="text-xs text-gray-400">{currentIndex + 1} / {totalCount}</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      </div>

      {/* 問題カード（key で再マウント→スライドイン） */}
      {currentQuestion && (
        <div key={currentIndex} className="slide-in">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalCount={totalCount}
            elapsed={showAnswer ? undefined : timer.elapsed}
            targetSeconds={showAnswer ? undefined : targetSeconds}
            isOverTime={timer.isOverTime}
          />
        </div>
      )}

      {/* 入力エリア */}
      <AnswerInput
        value={userAnswer}
        onChange={setUserAnswer}
        disabled={showAnswer}
      />

      {/* 答えを見るボタン or 解答・解説 */}
      {!showAnswer ? (
        <Button variant="primary" size="lg" fullWidth onClick={handleRevealWithTimer}>
          答えを見る
        </Button>
      ) : (
        <div className="space-y-4 fade-in">
          {currentQuestion && (
            <ModelAnswer question={currentQuestion} userAnswer={userAnswer} />
          )}

          {/* タイム結果表示 */}
          {targetSeconds !== null && (
            <div className={`text-center text-sm font-medium py-2 rounded-xl ${
              timer.isOverTime
                ? 'bg-orange-50 text-orange-500'
                : 'bg-green-50 text-green-600'
            }`}>
              {timer.isOverTime
                ? `⏱ ${timer.elapsed}秒（目安 ${targetSeconds}秒 超過）`
                : `⚡ ${timer.elapsed}秒で回答（目安 ${targetSeconds}秒 以内）`
              }
            </div>
          )}

          <SelfRatingButtons onRate={handleRateWithTimer} />
        </div>
      )}
    </div>
  );
}

export default function TrainingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400">読み込み中…</div>
      </div>
    }>
      <TrainingContent />
    </Suspense>
  );
}
