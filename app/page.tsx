import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ds/atomic/Button';
import { CategoryCard } from '@/components/ds/molecular/CategoryCard';
import { ProductCard } from '@/components/ds/molecular/ProductCard';
import { mockCategories } from '@/lib/mock/categories';
import { getFeaturedProducts, getProductById } from '@/lib/mock/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const heroProduct = getProductById('cel-001'); // iPhone 15 Pro Max

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - AVA Style */}
      <section className="relative bg-[#0f51fe] overflow-hidden min-h-[600px]">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-200 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Tech Icons Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-10 left-10 text-white text-6xl">📱</div>
          <div className="absolute top-32 right-20 text-white text-5xl">💻</div>
          <div className="absolute bottom-20 left-1/4 text-white text-4xl">🖥️</div>
          <div className="absolute top-40 left-1/2 text-white text-5xl">⌚</div>
          <div className="absolute bottom-32 right-1/3 text-white text-6xl">🎧</div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="text-white pt-4">
              {/* Promo Badge with better visibility */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-200 to-brand-100 text-brand-900 rounded-full text-sm font-bold mb-6 shadow-lg">
                <span className="text-lg">🔥</span>
                <span>Ofertas especiales • Envíos a toda Colombia 🇨🇴</span>
              </div>

              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 mb-6 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                <span className="text-brand-100 font-bold text-base">AVA TECNOLOGÍA</span>
                <span className="text-white/40">•</span>
                <span className="text-white text-sm">📍 Santa Rosa de Cabal</span>
              </div>

              {/* Main Title - Pure white for maximum contrast */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                  La Mejor Tecnología
                  <span className="block text-white mt-2">para Ti y Tu Hogar</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-white mb-8 max-w-lg leading-relaxed">
                Más de 240 productos en celulares, computadores, televisores e impresoras.
              </p>

              {/* Trust Badges - Enhanced contrast with glassmorphism */}
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 mb-8 border border-white/30 shadow-xl">
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-100 text-xl">✓</span>
                    <span className="font-bold">Crédito sin cuota inicial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-100 text-xl">✓</span>
                    <span className="font-bold">Garantía Oficial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-100 text-xl">✓</span>
                    <span className="font-bold">Envío Nacional</span>
                  </div>
                </div>
              </div>

              {/* CTAs with better hierarchy */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link href="/search">
                  <Button
                    variant="secondary-brand"
                    size="lg"
                    icon={<ArrowRight className="h-5 w-5" />}
                    iconPosition="right"
                    className="border-0 shadow-xl font-bold transition-all duration-300 hover:scale-105"
                  >
                    Explorar 240+ Productos
                  </Button>
                </Link>
                <a
                  href="https://wa.me/57XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <span className="text-xl">📱</span>
                  <span className="text-white">Cotizar por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Hero Visual - Product Showcase */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Main Product Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl transform transition-transform duration-500 hover:scale-105">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-brand-200 to-brand-100 text-brand-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">
                    <span className="mr-1 text-brand">🔥</span>Más Vendido
                  </div>

                  {/* Hero Product Image - iPhone 15 Pro Max */}
                  <div className="bg-gradient-to-br from-white via-neutral-50 to-brand-50/20 rounded-2xl aspect-square mb-6 flex items-center justify-center relative overflow-hidden">
                    {/* Subtle accent overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 via-transparent to-transparent" />
                    {/* Soft glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-100/10" />
                    {heroProduct?.images[0] && (
                      <Image
                        src={heroProduct.images[0].url}
                        alt={heroProduct.images[0].alt ?? 'iPhone 15 Pro Max'}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full p-4 relative z-10 drop-shadow-2xl"
                        priority
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className="text-neutral-900 font-bold text-2xl mb-2">iPhone 15 Pro Max</h3>
                  <p className="text-neutral-600 mb-5">256GB • Titanio Natural</p>

                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-4xl font-bold text-brand-600">$4.999.000</span>
                    <span className="text-sm text-neutral-400 line-through">$5.499.000</span>
                  </div>

                  <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-xl p-4 text-center border border-brand-100">
                    <p className="text-brand-700 font-bold">
                      O desde <span className="text-xl">$208.000/mes</span> a crédito
                    </p>
                    <p className="text-xs text-brand-600 mt-1">Sin cuota inicial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-neutral-50 py-8 border-b border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mb-1">
                <span className="text-brand-600 text-2xl">✓</span>
              </div>
              <span className="text-sm font-bold text-neutral-900">Garantía Oficial</span>
              <span className="text-xs text-neutral-600">En todos los productos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mb-1">
                <span className="text-brand-600 text-2xl">💳</span>
              </div>
              <span className="text-sm font-bold text-neutral-900">Crédito Fácil</span>
              <span className="text-xs text-neutral-600">Crédito disponible</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mb-1">
                <span className="text-brand-600 text-2xl">🚚</span>
              </div>
              <span className="text-sm font-bold text-neutral-900">Envío Gratis</span>
              <span className="text-xs text-neutral-600">Compras +$200.000</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mb-1">
                <span className="text-brand-600 text-2xl">⭐</span>
              </div>
              <span className="text-sm font-bold text-neutral-900">+365 Clientes</span>
              <span className="text-xs text-neutral-600">Nos recomiendan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Explora por Categoría
            </h2>
            <p className="text-neutral-500 mt-2">Encuentra exactamente lo que buscas</p>
          </div>
          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 text-brand-500 font-medium hover:text-brand-600 transition-colors"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                Productos Destacados
              </h2>
              <p className="text-neutral-500 mt-2">Los favoritos de nuestros clientes</p>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-2 text-brand-500 font-medium hover:text-brand-600 transition-colors"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-neutral-600">Miles de colombianos confían en nosotros</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-warning-500 text-lg">
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-neutral-700 mb-4">
              &quot;Excelente servicio, compré un portátil a crédito y llegó en 3 días a Pereira.
              Totalmente recomendados!&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="text-brand-600 font-bold">MC</span>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">María Camila R.</p>
                <p className="text-sm text-neutral-500">Pereira, Risaralda</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-warning-500 text-lg">
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-neutral-700 mb-4">
              &quot;Los mejores precios en celulares. Me atendieron por WhatsApp super rápido y me
              explicaron todo el proceso de crédito.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="text-brand-600 font-bold">JD</span>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Juan David M.</p>
                <p className="text-sm text-neutral-500">Manizales, Caldas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-warning-500 text-lg">
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-neutral-700 mb-4">
              &quot;Compré un televisor y llegó perfecto. Garantía incluida y buena asesoría.
              Volveré a comprar sin duda.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="text-brand-600 font-bold">LP</span>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Laura P.</p>
                <p className="text-sm text-neutral-500">Armenia, Quindío</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                ¿Necesitas Crédito? ¡Te Ayudamos!
              </h3>
              <p className="text-white/90 mb-6">
                Tramitamos tu <strong>crédito</strong> y otras opciones de financiamiento. Llévate
                tu tecnología hoy y paga en cómodas cuotas mensuales.
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-xl">✓</span>
                  <span>Sin cuota inicial</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-xl">✓</span>
                  <span>Hasta 36 meses</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-xl">✓</span>
                  <span>Aprobación inmediata</span>
                </div>
              </div>
              <a
                href="https://wa.me/57XXXXXXXXXX?text=Hola%2C%20quiero%20información%20sobre%20crédito"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
              >
                📱 consultar crédito disponible
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-bold text-lg mb-4">Ejemplo de Financiación</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between pb-2 border-b border-white/20">
                    <span>Producto:</span>
                    <span className="font-semibold">Portátil HP</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/20">
                    <span>Precio:</span>
                    <span className="font-semibold">$1.500.000</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/20">
                    <span>Plazo:</span>
                    <span className="font-semibold">24 meses</span>
                  </div>
                  <div className="flex justify-between items-baseline text-white font-extrabold text-xl pt-3">
                    <span>Cuota mensual:</span>
                    <span className="text-2xl">~$62.500</span>
                  </div>
                </div>
                <p className="text-xs text-white/70 mt-4">*Sujeto a aprobación de crédito</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-neutral-400 mb-6">
            Contáctanos por WhatsApp y te ayudaremos a encontrar el producto perfecto para ti.
            También hacemos pedidos especiales.
          </p>
          <p className="text-sm text-neutral-500">
            Haz clic en el botón flotante de WhatsApp en la esquina inferior derecha
          </p>
        </div>
      </section>
    </div>
  );
}
