/**
 * Product Detail Page
 *
 * Displays detailed product information including:
 * - Image gallery
 * - Specifications
 * - Variants selector
 * - Add to cart functionality
 *
 * Future: Product data will be fetched from AppSync GraphQL API
 * Example:
 *   query GetProduct($id: ID!) {
 *     getProduct(id: $id) {
 *       id name description categoryId specs { key value }
 *       priceOriginal priceDiscount
 *       images { url isThumbnail variantId alt }
 *       variants { id name type stockAvailable }
 *     }
 *   }
 */

'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ShoppingCart, Check } from 'lucide-react';
import ImageGallery from '@/components/product/ImageGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import VariantSelector from '@/components/product/VariantSelector';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Button } from '@/components/ds/atomic/Button';
import { Badge } from '@/components/ds/atomic/Badge';
import { Price } from '@/components/ds/molecular/Price';
import { getProductById } from '@/lib/mock/products';
import { getCategoryName } from '@/lib/mock/categories';
import { useCartStore } from '@/lib/store/cartStore';
import { calculateDiscountPercentage, generateProductWhatsAppMessage } from '@/lib/utils/format';
import { ProductVariant } from '@/lib/types';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Future: Replace with GraphQL query
  const product = getProductById(resolvedParams.id);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    notFound();
  }

  const categoryName = getCategoryName(product.categoryId);
  const discountPercentage = calculateDiscountPercentage(
    product.priceOriginal,
    product.priceDiscount
  );
  const hasDiscount = discountPercentage > 0;

  // Filter images for selected variant or show all
  const displayImages = selectedVariant?.images && selectedVariant.images.length > 0
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

  const whatsappMessage = generateProductWhatsAppMessage(
    product.name,
    selectedVariant?.name
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-neutral-700">
            <li>
              <a href="/" className="hover:text-accent-500 transition-colors">
                Inicio
              </a>
            </li>
            <li>/</li>
            <li>
              <a href={`/search?category=${product.categoryId}`} className="hover:text-accent-500 transition-colors">
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
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              {product.name}
            </h1>

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
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Descripción
              </h3>
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
              <label className="block text-sm font-medium text-neutral-900 mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 w-10 h-10 rounded-md font-bold transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border-2 border-neutral-100 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 rounded-md py-2 font-semibold outline-none transition-colors"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 w-10 h-10 rounded-md font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                variant={addedToCart ? 'outline' : 'primary'}
                size="lg"
                className="w-full"
                icon={addedToCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              >
                {addedToCart ? 'Agregado al carrito' : 'Agregar al carrito'}
              </Button>

              <Button
                onClick={handleBuyNow}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Comprar ahora
              </Button>

              <WhatsAppButton
                message={whatsappMessage}
                fixed={false}
                className="w-full"
              />
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
