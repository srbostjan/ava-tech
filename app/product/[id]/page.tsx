'use client';

import { ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { useState, use } from 'react';
import { Badge } from '@/components/ds/atomic/Badge';
import { Button } from '@/components/ds/atomic/Button';
import { Rating } from '@/components/ds/atomic/Rating';
import { Price } from '@/components/ds/molecular/Price';
import ImageGallery from '@/components/product/ImageGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import VariantSelector from '@/components/product/VariantSelector';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getCategoryName } from '@/lib/mock/categories';
import { getProductById } from '@/lib/mock/products';
import { useCartStore } from '@/lib/store/cartStore';
import { ProductVariant } from '@/lib/types';
import { generateProductWhatsAppMessage } from '@/lib/utils/format';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Future: Replace with GraphQL query
  const product = getProductById(resolvedParams.id);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    notFound();
  }

  const categoryName = getCategoryName(product.categoryId);

  // Filter images for selected variant or show all
  const displayImages =
    selectedVariant?.images && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product.images;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    router.push('/cart');
  };

  const whatsappMessage = generateProductWhatsAppMessage(product.name, selectedVariant?.name);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-neutral-700">
            <li>
              <Link href="/" className="hover:text-accent-500 transition-colors">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <a
                href={`/search?category=${product.categoryId}`}
                className="hover:text-accent-500 transition-colors"
              >
                {categoryName}
              </a>
            </li>
            <li>/</li>
            <li className="text-neutral-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Image Gallery */}
          <div>
            <ImageGallery images={displayImages} productName={product.name} />
          </div>

          {/* Right Column: Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">{product.name}</h1>

            {/* Rating & Social Proof */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {product.rating && (
                <Rating
                  rating={product.rating.averageRating}
                  totalReviews={product.rating.totalReviews}
                  size="md"
                />
              )}
              {product.soldCount !== undefined && product.soldCount > 50 && (
                <Badge variant="success" size="sm">
                  ✓ {product.soldCount}+ vendidos
                </Badge>
              )}
            </div>

            {/* Urgency Signals */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.stockCount !== undefined && product.stockCount <= 10 && (
                <Badge variant="error" size="md">
                  ⚠️ ¡Solo quedan {product.stockCount} en stock!
                </Badge>
              )}
              {product.viewsToday !== undefined && product.viewsToday > 20 && (
                <Badge variant="outline" size="md">
                  🔥 {product.viewsToday} personas viendo este producto ahora
                </Badge>
              )}
            </div>

            {/* Category */}
            <p className="text-sm text-neutral-700 mb-6">
              Categoría:{' '}
              <a
                href={`/search?category=${product.categoryId}`}
                className="text-accent-500 hover:text-accent-600 transition-colors font-medium"
              >
                {categoryName}
              </a>
            </p>

            {/* Pricing */}
            <div className="mb-6">
              <Price
                original={product.priceOriginal}
                discount={product.priceDiscount}
                size="lg"
                layout="vertical"
                showPercentageBadge={true}
                showSavings={true}
              />
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-neutral-100">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Descripción</h3>
              <p className="text-neutral-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <VariantSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariant?.id}
                  onVariantChange={setSelectedVariant}
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6 pb-6 border-b border-neutral-100">
              <label className="block text-sm font-medium text-neutral-900 mb-3">Cantidad</label>
              <div className="inline-flex items-center bg-neutral-50 rounded-xl border border-neutral-200 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white rounded-lg font-medium text-xl transition-all active:scale-95"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) ?? 1))}
                  className="w-16 text-center bg-transparent text-neutral-900 font-semibold text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white rounded-lg font-medium text-xl transition-all active:scale-95"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                onClick={handleAddToCart}
                variant={addedToCart ? 'outline' : 'primary'}
                size="lg"
                className="w-full min-h-[56px] text-base font-bold shadow-lg hover:shadow-xl transition-shadow"
                icon={
                  addedToCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />
                }
              >
                {addedToCart ? '✓ Agregado al Carrito' : 'Agregar al Carrito'}
              </Button>

              <Button
                onClick={handleBuyNow}
                variant="secondary"
                size="lg"
                className="w-full min-h-[56px] text-base font-bold"
              >
                🛒 Comprar Ahora
              </Button>

              <WhatsAppButton
                message={whatsappMessage}
                fixed={false}
                className="w-full min-h-[56px]"
              />
            </div>

            {/* Shipping & Policies Info */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <span className="text-brand-600 text-lg">🚚</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Envío Nacional</h4>
                  <p className="text-sm text-neutral-600">
                    Gratis en compras superiores a $200.000. Entrega en 3-5 días hábiles a todo
                    Colombia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <span className="text-brand-600 text-lg">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Garantía Oficial</h4>
                  <p className="text-sm text-neutral-600">
                    Todos nuestros productos incluyen garantía del fabricante. Soporte técnico
                    disponible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <span className="text-brand-600 text-lg">💳</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Financiación Disponible</h4>
                  <p className="text-sm text-neutral-600">
                    Paga a crédito. Hasta 36 cuotas sin intereses. Contáctanos por WhatsApp para más
                    información.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <span className="text-brand-600 text-lg">🔄</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Devoluciones</h4>
                  <p className="text-sm text-neutral-600">
                    30 días para devoluciones. Producto debe estar en perfectas condiciones y con
                    empaque original.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        {product.specs && product.specs.length > 0 && (
          <div className="mb-8">
            <ProductSpecs specs={product.specs} />
          </div>
        )}
      </div>
    </div>
  );
}
