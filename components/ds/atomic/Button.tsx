/**
 * Button Component - Design System
 *
 * Botón versátil con múltiples variantes y tamaños
 * @see docs/design-system/components/atomic/Button.md
 */

'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm hover:shadow-md',
        secondary:
          'border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white',
        'secondary-brand': 'bg-white text-brand-600 hover:bg-brand-100 hover:text-brand-900',
        ghost: 'text-brand-500 hover:bg-brand-50',
        danger: 'bg-error-500 text-white hover:bg-error-600 shadow-sm hover:shadow-md',
        outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 text-base rounded-md',
        lg: 'h-13 px-8 text-lg rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  },
);

Button.displayName = 'Button';
