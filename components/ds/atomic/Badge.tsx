/**
 * Badge Component - Design System
 *
 * Badge para descuentos, estados y etiquetas
 */

'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-900',
        primary: 'bg-accent-500 text-white',
        success: 'bg-success-500 text-white',
        error: 'bg-error-500 text-white',
        warning: 'bg-warning-500 text-neutral-900',
        outline: 'border-2 border-neutral-100 text-neutral-900',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-full',
        md: 'text-sm px-3 py-1 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span className={cn(badgeVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
