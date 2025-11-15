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
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice, generateCartWhatsAppMessage, formatWhatsAppUrl } from '@/lib/utils/format';
import { WHATSAPP_NUMBER } from '@/lib/utils/constants';
import { Button } from '@/components/ds/atomic/Button';
import { Badge } from '@/components/ds/atomic/Badge';

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
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-neutral-400 mb-6" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-neutral-700 mb-8">
              ¡Agrega algunos productos para comenzar!
            </p>
            <Link href="/search">
              <Button variant="primary" size="lg">
                Explorar Productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
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
                  className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.productId}`}
                      className="w-full md:w-32 h-32 relative flex-shrink-0 overflow-hidden rounded-lg"
                    >
                      {thumbnail && (
                        <Image
                          src={thumbnail.url}
                          alt={item.product.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                          sizes="128px"
                        />
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.productId}`}
                        className="text-lg font-semibold text-neutral-900 hover:text-accent-500 block mb-2 transition-colors"
                      >
                        {item.product.name}
                      </Link>

                      {item.variant && (
                        <p className="text-sm text-neutral-700 mb-3">
                          Variante: <Badge variant="outline" size="sm">{item.variant.name}</Badge>
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mb-3">
                        <label className="text-sm text-neutral-700 font-medium">Cantidad:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.variantId
                              )
                            }
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 w-8 h-8 rounded-md font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold text-neutral-900">
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
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 w-8 h-8 rounded-md font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-wrap items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-success-500">
                          {formatPrice(itemSubtotal)}
                        </span>
                        {itemDiscount > 0 && (
                          <>
                            <span className="text-sm text-neutral-400 line-through">
                              {formatPrice(originalSubtotal)}
                            </span>
                            <Badge variant="success" size="sm">
                              Ahorras {formatPrice(itemDiscount)}
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-error-500 hover:text-error-600 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <Button
              onClick={clearCart}
              variant="ghost"
              className="text-error-500 hover:text-error-600"
            >
              <Trash2 className="w-4 h-4" />
              Vaciar carrito
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-neutral-100">
                <div className="flex justify-between text-neutral-700">
                  <span>Productos ({totalItems})</span>
                  <span className="font-medium">{formatPrice(subtotal + totalDiscount)}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between text-success-500 font-semibold">
                    <span>Descuento total</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-700">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-neutral-900 mb-6">
                <span>Total</span>
                <span className="text-success-500">{formatPrice(total)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-success-500 hover:bg-success-600 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Finalizar por WhatsApp
              </button>

              <p className="text-xs text-neutral-500 mt-3 text-center">
                Al finalizar, se abrirá WhatsApp con tu pedido prellenado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
