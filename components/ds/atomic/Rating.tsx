/**
 * Rating Component - Design System
 *
 * Displays star ratings with reviews count
 */

import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface RatingProps {
  rating: number; // 0-5
  totalReviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export function Rating({
  rating,
  totalReviews,
  size = 'md',
  showNumber = true,
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, i) => i + 1).map((starPosition) => (
          <Star
            key={`star-full-${starPosition}`}
            className={cn(sizeClasses[size], 'fill-warning-500 text-warning-500')}
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <StarHalf className={cn(sizeClasses[size], 'fill-warning-500 text-warning-500')} />
        )}

        {/* Empty stars - No fill for visual clarity */}
        {Array.from(
          { length: emptyStars },
          (_, i) => fullStars + (hasHalfStar ? 1 : 0) + i + 1,
        ).map((starPosition) => (
          <Star
            key={`star-empty-${starPosition}`}
            className={cn(sizeClasses[size], 'fill-transparent text-neutral-300')}
          />
        ))}
      </div>

      {showNumber && (
        <div className={cn('flex items-center gap-1', textSizeClasses[size])}>
          <span className="font-semibold text-neutral-900">{rating.toFixed(1)}</span>
          {totalReviews !== undefined && <span className="text-neutral-500">({totalReviews})</span>}
        </div>
      )}
    </div>
  );
}
