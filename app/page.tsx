/**
 * Home Page
 *
 * Displays featured products and categories
 *
 * Future: Product data will be fetched from AWS AppSync GraphQL API
 * Example query:
 *   query ListFeaturedProducts {
 *     listProducts(filter: { featured: { eq: true } }) {
 *       items { id name description priceOriginal priceDiscount images { url } }
 *     }
 *   }
 */

import { Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ds/atomic/Button';
import { CategoryCard } from '@/components/ds/molecular/CategoryCard';
import { ProductCard } from '@/components/ds/molecular/ProductCard';
import { mockCategories } from '@/lib/mock/categories';
import { getFeaturedProducts } from '@/lib/mock/products';

export default function HomePage() {
  // Currently using mock data
  // Future: Replace with GraphQL query using AWS Amplify
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - Design System Colors */}
      <section className="bg-gradient-to-r from-accent-600 via-accent-500 to-accent-600 text-white py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Descubre Productos Únicos
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            Calidad excepcional con descuentos increíbles
          </p>
          <Link href="/search">
            <Button variant="secondary" size="lg" icon={<Search className="h-5 w-5" />}>
              Explorar Productos
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          Categorías Destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent-50 border-t border-neutral-100 py-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-neutral-700 mb-6">
            Contáctanos por WhatsApp y te ayudaremos a encontrarlo
          </p>
          <p className="text-sm text-neutral-600">
            Haz clic en el botón flotante de WhatsApp en la esquina inferior derecha
          </p>
        </div>
      </section>
    </div>
  );
}
