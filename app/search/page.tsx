/**
 * Search Page
 *
 * Allows users to search and filter products
 *
 * Future: Will use GraphQL queries with filters
 * Example:
 *   query SearchProducts($query: String, $filter: ProductFilterInput) {
 *     searchProducts(query: $query, filter: $filter) {
 *       items { ...ProductFields }
 *       nextToken
 *     }
 *   }
 */

'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { filterProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';
import { Product } from '@/lib/types';

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

  // Filter products based on criteria
  // Future: Replace with GraphQL query to AppSync
  const filteredProducts = useMemo(() => {
    return filterProducts({
      searchQuery: debouncedQuery,
      categoryId: selectedCategory || undefined,
      minPrice: minPrice ? minPrice * 100 : undefined, // Convert to cents
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Buscar Productos
        </h1>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                placeholder="Nombre del producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="mt-4">
              <button
                onClick={handleClearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
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
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tus filtros o búsqueda
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center"><div className="text-gray-600">Cargando...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
