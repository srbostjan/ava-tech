/**
 * Product Card Component - Design System
 *
 * Card optimizado para mostrar productos en grids
 */

'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

import { Badge } from '../atomic/Badge';
import { Button } from '../atomic/Button';
import { Rating } from '../atomic/Rating';

import { Price } from './Price';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const thumbnail = product.images.find((img) => img.isThumbnail) ?? product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className={cn(
          'group bg-white rounded-xl border-2 border-neutral-200 hover:border-brand-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer',
          className,
        )}
      >
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden">
          {thumbnail && (
            <Image
              src={thumbnail.url}
              alt={thumbnail.alt ?? product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="primary" size="sm">
                Destacado
              </Badge>
            </div>
          )}

          {/* Discount Badge */}
          {product.priceOriginal > product.priceDiscount && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" size="sm" className="border-none">
                -
                {Math.round(
                  ((product.priceOriginal - product.priceDiscount) / product.priceOriginal) * 100,
                )}
                %
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Product Name */}
          <h1 className="text-base font-bold text-neutral-950 mb-2 line-clamp-2 min-h-[3rem] group-hover:underline transition-all">
            {product.name}
          </h1>

          {/* Rating & Social Proof */}
          {product.rating && (
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              <Rating
                rating={product.rating.averageRating}
                totalReviews={product.rating.totalReviews}
                size="sm"
              />
              {product.soldCount !== undefined && product.soldCount > 50 && (
                <span className="text-xs text-neutral-600">• {product.soldCount}+ vendidos</span>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-neutral-700 mb-4 line-clamp-2 flex-1">{product.description}</p>

          {/* Social Proof & Urgency */}
          <div className="mb-3 flex flex-wrap gap-2">
            {/* Urgency - Consistent solid red style for low stock */}
            {product.stockCount !== undefined && product.stockCount <= 10 && (
              <Badge variant="error" size="sm">
                ¡Solo {product.stockCount} disponibles!
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <Price
              original={product.priceOriginal}
              discount={product.priceDiscount}
              size="md"
              layout="vertical"
              showPercentageBadge={false}
            />
          </div>

          {/* Add to Cart Button */}
          {onAddToCart && (
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleAddToCart}
              icon={<ShoppingCart className="h-4 w-4" />}
            >
              Agregar al Carrito
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
