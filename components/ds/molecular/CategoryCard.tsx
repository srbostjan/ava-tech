/**
 * Category Card Component - Design System
 *
 * Card para mostrar categorías con imagen y overlay
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        'group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1',
        className
      )}
    >
      <div className="relative w-full h-48 bg-neutral-50">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Category Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-white/90 line-clamp-1">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
