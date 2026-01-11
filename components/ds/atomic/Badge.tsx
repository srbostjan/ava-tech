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
  'inline-flex items-center justify-center font-bold transition-colors shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-neutral-800 text-white',
        primary: 'bg-blue-600 text-white',
        success: 'bg-green-700 text-white',
        error: 'bg-red-600 text-white',
        warning: 'bg-amber-500 text-neutral-950',
        outline: 'border-2 border-neutral-800 bg-white text-neutral-950',
        urgency: 'bg-brand-100 text-brand-800',
      },
      size: {
        sm: 'text-xs px-2.5 py-1 rounded-md',
        md: 'text-sm px-3.5 py-1.5 rounded-md',
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
