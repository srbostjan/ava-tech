/**
 * Category Card Component
 *
 * Displays category information with link to filtered search
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/search?category=${category.id}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Category Image */}
      <div className="relative w-full h-48 bg-gray-100">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Category Name on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-200 mt-1">{category.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
