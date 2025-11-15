/**
 * Price Component - Design System
 *
 * Muestra precio original, con descuento y porcentaje de ahorro
 */

'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils/format';
import { Badge } from '../atomic/Badge';

export interface PriceProps extends HTMLAttributes<HTMLDivElement> {
  /** Precio original en centavos */
  original: number;
  /** Precio con descuento en centavos */
  discount: number;
  /** Mostrar badge de porcentaje de descuento */
  showPercentageBadge?: boolean;
  /** Mostrar ahorro en pesos */
  showSavings?: boolean;
  /** Tamaño del precio */
  size?: 'sm' | 'md' | 'lg';
  /** Layout: horizontal o vertical */
  layout?: 'horizontal' | 'vertical';
}

export function Price({
  original,
  discount,
  showPercentageBadge = true,
  showSavings = false,
  size = 'md',
  layout = 'vertical',
  className,
  ...props
}: PriceProps) {
  const hasDiscount = original > discount;
  const discountPercentage = calculateDiscountPercentage(original, discount);
  const savings = original - discount;

  const sizeClasses = {
    sm: {
      discount: 'text-lg',
      original: 'text-sm',
      savings: 'text-xs',
    },
    md: {
      discount: 'text-2xl',
      original: 'text-base',
      savings: 'text-sm',
    },
    lg: {
      discount: 'text-4xl',
      original: 'text-xl',
      savings: 'text-base',
    },
  };

  return (
    <div
      className={cn(
        'flex gap-2',
        layout === 'vertical' ? 'flex-col' : 'flex-row items-baseline',
        className
      )}
      {...props}
    >
      {/* Precio con descuento */}
      <div className="flex items-baseline gap-2">
        <span className={cn('font-bold text-success-500', sizeClasses[size].discount)}>
          {formatPrice(discount)}
        </span>

        {/* Badge de descuento */}
        {hasDiscount && showPercentageBadge && (
          <Badge variant="error" size="sm">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Precio original (tachado) */}
      {hasDiscount && (
        <div className="flex flex-col gap-1">
          <span className={cn('text-neutral-400 line-through', sizeClasses[size].original)}>
            {formatPrice(original)}
          </span>

          {/* Ahorro */}
          {showSavings && (
            <span className={cn('text-success-500 font-medium', sizeClasses[size].savings)}>
              Ahorras {formatPrice(savings)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
