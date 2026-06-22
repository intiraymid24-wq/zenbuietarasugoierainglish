'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import questionsData from '@/data/questions.json';
import { Question, Category } from '@/types';
import { CATEGORY_META } from '@/lib/constants';
import { useStudySession } from '@/hooks/useStudySession';
import ProgressBar from '@/components/ui/ProgressBar';
import QuestionCard from '@/components/training/QuestionCard';
import AnswerInput from '@/components/training/AnswerInput';
import ModelAnswer from '@/components/training/ModelAnswer';
import SelfRatingButtons from '@/components/training/SelfRatingButtons';
import SessionComplete from '@/components/training/SessionComplete';
import Button from '@/components/ui/Button';

const allQuestions = questionsData as Question[];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function TrainingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') ?? 'all';

  const questions = useMemo(() => {
    const filtered =
      category === 'all'
        ? allQuestions
        : allQuestions.filter((q) => q.category === category);
    return shuffle(filtered);
  }, [category]);

  const {
    currentQuestion,
    currentIndex,
    totalCount,
    progress,
    showAnswer,
    userAnswer,
    setUserAnswer,
    completed,
    sessionResults,
    handleReveal,
    handleRate,
    reset,
  } = useStudySession({ questions });

  const categoryMeta = CATEGORY_META.find((c) => c.id === category);

  if (questions.length === 0) {
    return (
      <div className="px-4 pt-8 text-center space-y-4">
        <p className="text-5xl">😅</p>
        <p className="text-gray-600">このカテゴリに問題がありません</p>
        <Button variant="primary" onClick={() => router.back()}>
          戻る
        </Button>
      </div>
    );
  }

  if (completed) {
    return (
      <SessionComplete
        results={sessionResults}
        onRestart={reset}
      />
    );
  }

  return (
    <div className="px-4 pt-6 space-y-5">
      {/* ナビゲーションバー */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-600 p-1 -ml-1"
          aria-label="戻る"
        >
          ‹ 戻る
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">
              {categoryMeta?.icon} {categoryMeta?.label ?? 'すべて'}
            </span>
            <span className="text-xs text-gray-400">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>
          <ProgressBar value={progress} />
        </div>
      </div>

      {/* 問題カード */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalCount={totalCount}
        />
      )}

      {/* 入力エリア */}
      <AnswerInput
        value={userAnswer}
        onChange={setUserAnswer}
        disabled={showAnswer}
      />

      {/* 答えを見るボタン or 模範解答 */}
      {!showAnswer ? (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleReveal}
        >
          答えを見る
        </Button>
      ) : (
        <>
          {currentQuestion && (
            <ModelAnswer
              answers={currentQuestion.modelAnswers}
              userAnswer={userAnswer}
            />
          )}
          <SelfRatingButtons onRate={handleRate} />
        </>
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
