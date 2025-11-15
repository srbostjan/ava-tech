/**
 * Search Page - Refactored with Design System
 *
 * Allows users to search and filter products
 */

'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ds/molecular/ProductCard';
import { Button } from '@/components/ds/atomic/Button';
import { filterProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';
import { Search, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return filterProducts({
      searchQuery: debouncedQuery,
      categoryId: selectedCategory || undefined,
      minPrice: minPrice ? minPrice * 100 : undefined,
      maxPrice: maxPrice ? maxPrice * 100 : undefined,
    });
  }, [debouncedQuery, selectedCategory, minPrice, maxPrice]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  const hasActiveFilters = debouncedQuery || selectedCategory || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          Buscar Productos
        </h1>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Buscar
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nombre del producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-neutral-100 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 focus:outline-none transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-100 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 focus:outline-none transition-colors bg-white"
              >
                <option value="">Todas las categorías</option>
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Precio mínimo ($)
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={minPrice || ''}
                onChange={(e) =>
                  setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                }
                className="w-full px-4 py-2 border border-neutral-100 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Precio máximo ($)
              </label>
              <input
                type="number"
                placeholder="999999"
                min="0"
                value={maxPrice || ''}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                }
                className="w-full px-4 py-2 border border-neutral-100 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-accent-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                icon={<X className="h-4 w-4" />}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-700 text-sm">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-neutral-700 mb-6">
                Intenta ajustar tus filtros o búsqueda
              </p>
              <Button variant="primary" onClick={handleClearFilters}>
                Ver todos los productos
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 py-8 flex items-center justify-center">
          <div className="text-neutral-700">Cargando...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
