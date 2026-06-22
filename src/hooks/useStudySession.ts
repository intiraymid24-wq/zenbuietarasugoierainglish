'use client';

import { useState, useCallback } from 'react';
import { Question, SelfRating, StudyRecord } from '@/types';
import { addStudyRecord, addToReviewList, removeFromReviewList, loadData } from '@/lib/storage';

interface UseStudySessionProps {
  questions: Question[];
}

export function useStudySession({ questions }: UseStudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [sessionResults, setSessionResults] = useState<StudyRecord[]>([]);

  const currentQuestion = questions[currentIndex] ?? null;
  const progress = questions.length > 0
    ? Math.round((currentIndex / questions.length) * 100)
    : 0;

  const handleReveal = useCallback(() => {
    setShowAnswer(true);
  }, []);

  const handleRate = useCallback(
    (rating: SelfRating) => {
      if (!currentQuestion) return;

      const data = loadData();
      const existing = data.studyRecords.find(
        (r) => r.questionId === currentQuestion.id
      );

      const record: StudyRecord = {
        questionId: currentQuestion.id,
        userAnswer,
        selfRating: rating,
        studiedAt: new Date().toISOString(),
        reviewCount: (existing?.reviewCount ?? 0) + 1,
        lastReviewedAt: new Date().toISOString(),
      };

      addStudyRecord(record);

      // 復習リストの管理
      if (rating === 'bad' || rating === 'okay') {
        addToReviewList(currentQuestion.id);
      } else {
        removeFromReviewList(currentQuestion.id);
      }

      setSessionResults((prev) => [...prev, record]);

      // 次の問題へ
      if (currentIndex + 1 >= questions.length) {
        setCompleted(true);
      } else {
        setCurrentIndex((i) => i + 1);
        setShowAnswer(false);
        setUserAnswer('');
      }
    },
    [currentQuestion, currentIndex, questions.length, userAnswer]
  );

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setUserAnswer('');
    setCompleted(false);
    setSessionResults([]);
  }, []);

  return {
    currentQuestion,
    currentIndex,
    totalCount: questions.length,
    progress,
    showAnswer,
    userAnswer,
    setUserAnswer,
    completed,
    sessionResults,
    handleReveal,
    handleRate,
    reset,
  };
}
