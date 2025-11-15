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

import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';
import { getFeaturedProducts } from '@/lib/mock/products';
import { mockCategories } from '@/lib/mock/categories';

export default function HomePage() {
  // Currently using mock data
  // Future: Replace with GraphQL query using AWS Amplify
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a E-Commerce
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Los mejores productos con increíbles descuentos
          </p>
          <a
            href="/search"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Explorar Productos
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Categorías Destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl mb-8">
            Contáctanos por WhatsApp y te ayudaremos a encontrarlo
          </p>
          <p className="text-sm opacity-90">
            Haz clic en el botón flotante de WhatsApp en la esquina inferior derecha
          </p>
        </div>
      </section>
    </div>
  );
}
