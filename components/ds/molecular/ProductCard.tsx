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
          'group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full',
          className,
        )}
      >
        {/* Image Container */}
        <div className="relative w-full h-64 bg-neutral-50 overflow-hidden">
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
              <Badge variant="error" size="md">
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
        <div className="p-6 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-accent-500 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-700 mb-4 line-clamp-2 flex-1">{product.description}</p>

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

          {!onAddToCart && (
            <Button variant="outline" size="md" fullWidth>
              Ver Detalles
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
