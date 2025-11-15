/**
 * Cart Page
 *
 * Displays shopping cart with:
 * - List of items
 * - Quantity controls
 * - Price calculations
 * - Checkout via WhatsApp
 *
 * Future: Cart will be synced to DynamoDB when user is authenticated
 * GraphQL mutations:
 *   mutation UpdateCartItem($input: UpdateCartItemInput!) { ... }
 *   mutation DeleteCartItem($id: ID!) { ... }
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice, generateCartWhatsAppMessage, formatWhatsAppUrl } from '@/lib/utils/format';
import { WHATSAPP_NUMBER } from '@/lib/utils/constants';

export default function CartPage() {
  const { items, totalItems, subtotal, totalDiscount, total, updateQuantity, removeItem, clearCart } =
    useCartStore();

  const handleCheckout = () => {
    const cartMessage = generateCartWhatsAppMessage(
      items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        variant: item.variant?.name,
        price: item.priceAtAdd,
      }))
    );

    const whatsappUrl = formatWhatsAppUrl(WHATSAPP_NUMBER, cartMessage);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8">
              ¡Agrega algunos productos para comenzar!
            </p>
            <Link
              href="/search"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const thumbnail =
                item.product.images.find((img) => img.isThumbnail) ||
                item.product.images[0];
              const itemSubtotal = item.priceAtAdd * item.quantity;
              const originalSubtotal = item.product.priceOriginal * item.quantity;
              const itemDiscount = originalSubtotal - itemSubtotal;

              return (
                <div
                  key={`${item.productId}-${item.variantId || 'default'}`}
                  className="bg-white rounded-lg shadow-md p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.productId}`}
                      className="w-full md:w-32 h-32 relative flex-shrink-0"
                    >
                      {thumbnail && (
                        <Image
                          src={thumbnail.url}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                          sizes="128px"
                        />
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.productId}`}
                        className="text-lg font-semibold text-gray-800 hover:text-blue-600 block mb-2"
                      >
                        {item.product.name}
                      </Link>

                      {item.variant && (
                        <p className="text-sm text-gray-600 mb-2">
                          Variante: <span className="font-medium">{item.variant.name}</span>
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mb-3">
                        <label className="text-sm text-gray-600">Cantidad:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.variantId
                              )
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-lg font-bold"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.variantId
                              )
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-wrap items-baseline gap-2 mb-2">
                        <span className="text-xl font-bold text-green-600">
                          {formatPrice(itemSubtotal)}
                        </span>
                        {itemDiscount > 0 && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(originalSubtotal)}
                            </span>
                            <span className="text-sm text-red-500 font-semibold">
                              Ahorras {formatPrice(itemDiscount)}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({totalItems})</span>
                  <span>{formatPrice(subtotal + totalDiscount)}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Descuento total</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                <span>Total</span>
                <span className="text-green-600">{formatPrice(total)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Finalizar por WhatsApp
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Al finalizar, se abrirá WhatsApp con tu pedido prellenado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
