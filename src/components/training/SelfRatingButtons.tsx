'use client';

import { SelfRating } from '@/types';
import { RATING_CONFIG } from '@/lib/constants';

interface SelfRatingButtonsProps {
  onRate: (rating: SelfRating) => void;
}

export default function SelfRatingButtons({ onRate }: SelfRatingButtonsProps) {
  const ratings: SelfRating[] = ['good', 'okay', 'bad'];

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-500 text-center">自己評価してください</p>
      <div className="grid grid-cols-3 gap-3">
        {ratings.map((rating) => {
          const cfg = RATING_CONFIG[rating];
          return (
            <button
              key={rating}
              onClick={() => onRate(rating)}
              className={[
                'flex flex-col items-center justify-center',
                'py-4 rounded-2xl text-white font-bold',
                'transition-all duration-150 active:scale-95',
                cfg.color,
              ].join(' ')}
            >
              <span className="text-2xl mb-1">{cfg.emoji}</span>
              <span className="text-xs leading-tight text-center">{cfg.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
