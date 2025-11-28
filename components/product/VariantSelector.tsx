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
  if (!variants ?? variants.length === 0) {
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getTypeLabel(type)}
          </label>
          <div className="flex flex-wrap gap-2">
            {typeVariants.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              const isOutOfStock = variant.stockAvailable === 0;

              return (
                <button
                  key={variant.id}
                  onClick={() => !isOutOfStock && onVariantChange(variant)}
                  disabled={isOutOfStock}
                  className={`
                    px-4 py-2 rounded-lg border-2 font-medium transition-all
                    ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }
                    ${isOutOfStock ? 'opacity-50 cursor-not-allowed line-through' : ''}
                  `}
                >
                  {variant.name}
                  {variant.stockAvailable !== undefined && !isOutOfStock && (
                    <span className="text-xs ml-1 text-gray-500">
                      ({variant.stockAvailable} disponibles)
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
