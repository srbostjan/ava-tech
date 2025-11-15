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
import ImageGallery from '@/components/product/ImageGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import VariantSelector from '@/components/product/VariantSelector';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getProductById } from '@/lib/mock/products';
import { getCategoryName } from '@/lib/mock/categories';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice, calculateDiscountPercentage, generateProductWhatsAppMessage } from '@/lib/utils/format';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600">
                Inicio
              </a>
            </li>
            <li>/</li>
            <li>
              <a href={`/search?category=${product.categoryId}`} className="hover:text-blue-600">
                {categoryName}
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Image Gallery */}
          <div>
            <ImageGallery images={displayImages} productName={product.name} />
          </div>

          {/* Right Column: Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            {/* Category */}
            <p className="text-sm text-gray-600 mb-4">
              Categoría:{' '}
              <a
                href={`/search?category=${product.categoryId}`}
                className="text-blue-600 hover:underline"
              >
                {categoryName}
              </a>
            </p>

            {/* Pricing */}
            <div className="mb-6">
              {hasDiscount && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.priceOriginal)}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discountPercentage}% OFF
                  </span>
                </div>
              )}
              <p className="text-4xl font-bold text-green-600">
                {formatPrice(product.priceDiscount)}
              </p>
              {hasDiscount && (
                <p className="text-sm text-green-600 mt-1">
                  Ahorras {formatPrice(product.priceOriginal - product.priceDiscount)}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Descripción
              </h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border-2 border-gray-300 rounded-lg py-2 font-semibold"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {addedToCart ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
              >
                Comprar ahora
              </button>

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
