/**
 * Category Card Component - Design System
 *
 * Card para mostrar categorías con imagen y overlay
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Category } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

export interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/search?category=${category.id}`}
      className={cn(
        'group block bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all duration-300',
        className,
      )}
    >
      <div className="relative w-full h-36 bg-neutral-100">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}
      </div>

      {/* Category Info */}
      <div className="p-4 text-center border-t border-neutral-100">
        <h3 className="font-semibold text-neutral-900 group-hover:text-brand-500 transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
