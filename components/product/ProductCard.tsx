/**
 * Product Card Component
 *
 * Displays product information in a card format
 * Used in Home page and Search results
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/lib/types';
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get thumbnail image
  const thumbnail = product.images.find((img) => img.isThumbnail) ?? product.images[0];

  const discountPercentage = calculateDiscountPercentage(
    product.priceOriginal,
    product.priceDiscount,
  );

  const hasDiscount = discountPercentage > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-gray-100">
          {thumbnail && (
            <Image
              src={thumbnail.url}
              alt={thumbnail.alt ?? product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{product.description}</p>

          {/* Pricing */}
          <div className="mt-auto">
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through mb-1">
                {formatPrice(product.priceOriginal)}
              </p>
            )}
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-green-600">
                {formatPrice(product.priceDiscount)}
              </p>
              {hasDiscount && (
                <p className="text-sm text-red-500 font-semibold">
                  Ahorra {formatPrice(product.priceOriginal - product.priceDiscount)}
                </p>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium">
            Ver detalles
          </button>
        </div>
      </Link>
    </div>
  );
}
