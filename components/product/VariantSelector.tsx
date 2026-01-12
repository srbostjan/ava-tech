/**
 * Variant Selector Component
 *
 * Allows users to select product variants (color, size, etc.)
 */

'use client';

import { ProductVariant } from '@/lib/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId?: string;
  onVariantChange: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) {
    return null;
  }

  // Group variants by type
  const variantsByType = variants.reduce(
    (acc, variant) => {
      if (!acc[variant.type]) {
        acc[variant.type] = [];
      }
      acc[variant.type].push(variant);
      return acc;
    },
    {} as Record<string, ProductVariant[]>,
  );

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      color: 'Color',
      size: 'Talla',
      material: 'Material',
      style: 'Estilo',
    };
    return labels[type] ?? type;
  };

  return (
    <div className="space-y-4">
      {Object.entries(variantsByType).map(([type, typeVariants]) => (
        <div key={type}>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {getTypeLabel(type)}
          </label>
          <div className="flex flex-wrap gap-2">
            {typeVariants.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              const isOutOfStock = variant.stockCount === 0;

              return (
                <button
                  key={variant.id}
                  onClick={() => !isOutOfStock && onVariantChange(variant)}
                  disabled={isOutOfStock}
                  className={`
                    px-4 py-2 rounded-lg border-2 font-medium transition-all
                    ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                    }
                    ${isOutOfStock ? 'opacity-50 cursor-not-allowed line-through' : ''}
                  `}
                >
                  {variant.name}
                  {variant.stockCount !== undefined && !isOutOfStock && (
                    <span className="text-xs ml-1 text-neutral-500">
                      ({variant.stockCount} disponibles)
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
