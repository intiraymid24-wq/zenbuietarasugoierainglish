'use client';

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import questionsData from '@/data/questions.json';
import { Question } from '@/types';
import { loadData } from '@/lib/storage';
import { CATEGORY_META, LEVEL_LABEL, LEVEL_COLOR } from '@/lib/constants';
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

export default function ReviewPage() {
  const [mode, setMode] = useState<'list' | 'training'>('list');
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  useEffect(() => {
    const data = loadData();
    setReviewIds(data.reviewList);
  }, []);

  const reviewQuestions = useMemo(
    () => shuffle(allQuestions.filter((q) => reviewIds.includes(q.id))),
    [reviewIds]
  );

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
  } = useStudySession({ questions: reviewQuestions });

  if (mode === 'training' && !completed) {
    if (reviewQuestions.length === 0) {
      return (
        <div className="px-4 pt-8 text-center space-y-4">
          <p className="text-5xl">🎉</p>
          <p className="text-xl font-bold text-gray-700">復習リストが空です！</p>
          <p className="text-gray-500">「できた！」と評価した問題が増えています。</p>
          <Link href="/">
            <Button variant="primary" size="lg" fullWidth>ホームへ戻る</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="px-4 pt-6 space-y-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode('list')}
            className="text-gray-400 hover:text-gray-600 p-1 -ml-1"
          >
            ‹ 戻る
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-orange-500 font-medium">🔁 復習モード</span>
              <span className="text-xs text-gray-400">{currentIndex + 1} / {totalCount}</span>
            </div>
            <ProgressBar value={progress} />
          </div>
        </div>

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalCount={totalCount}
          />
        )}

        <AnswerInput value={userAnswer} onChange={setUserAnswer} disabled={showAnswer} />

        {!showAnswer ? (
          <Button variant="primary" size="lg" fullWidth onClick={handleReveal}>
            答えを見る
          </Button>
        ) : (
          <>
            {currentQuestion && (
              <ModelAnswer answers={currentQuestion.modelAnswers} userAnswer={userAnswer} />
            )}
            <SelfRatingButtons onRate={handleRate} />
          </>
        )}
      </div>
    );
  }

  if (mode === 'training' && completed) {
    return (
      <SessionComplete
        results={sessionResults}
        onRestart={() => { reset(); setMode('list'); }}
      />
    );
  }

  // リスト表示モード
  return (
    <div className="px-4 pt-8 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">復習リスト</h1>
        <p className="text-sm text-gray-500 mt-1">
          「微妙」「できなかった」問題が保存されています
        </p>
      </div>

      {reviewIds.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-6xl">✨</p>
          <p className="text-xl font-bold text-gray-700">復習リストが空です</p>
          <p className="text-gray-500">練習を進めると、\n「微妙」「できなかった」問題がここに追加されます。</p>
          <Link href="/categories">
            <Button variant="primary" size="lg">練習を始める</Button>
          </Link>
        </div>
      ) : (
        <>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setMode('training')}
          >
            復習を開始 ({reviewIds.length}問)
          </Button>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-500">復習リストの問題</h2>
            {allQuestions
              .filter((q) => reviewIds.includes(q.id))
              .map((q) => {
                const cat = CATEGORY_META.find((c) => c.id === q.category);
                return (
                  <div
                    key={q.id}
                    className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800">{q.promptJapanese}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">{cat?.icon} {cat?.label}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${LEVEL_COLOR[q.level]}`}>
                            {LEVEL_LABEL[q.level]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
