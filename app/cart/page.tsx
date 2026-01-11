'use client';

import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ds/atomic/Badge';
import { Button } from '@/components/ds/atomic/Button';
import { WhatsAppCheckout } from '@/components/cart/WhatsAppCheckout';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils/format';

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    totalDiscount,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-neutral-400 mb-6" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-neutral-700 mb-8">¡Agrega algunos productos para comenzar!</p>
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
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const thumbnail =
                item.product.images.find((img) => img.isThumbnail) ?? item.product.images[0];
              const itemSubtotal = item.priceAtAdd * item.quantity;
              const originalSubtotal = item.product.priceOriginal * item.quantity;
              const itemDiscount = originalSubtotal - itemSubtotal;

              return (
                <div
                  key={`${item.productId}-${item.variantId ?? 'default'}`}
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
                          Variante:{' '}
                          <Badge variant="outline" size="sm">
                            {item.variant.name}
                          </Badge>
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mb-3">
                        <label className="text-sm text-neutral-700 font-medium">Cantidad:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1, item.variantId)
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
                              updateQuantity(item.productId, item.quantity + 1, item.variantId)
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
          <div className="lg:col-span-1 space-y-4">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Resumen del Pedido</h2>

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

                {total >= 20000000 ? (
                  <div className="flex justify-between text-success-500 font-semibold">
                    <span>Envío</span>
                    <span>¡GRATIS! 🎉</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-neutral-700">
                      <span>Envío</span>
                      <span className="text-sm">Por calcular</span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Agrega {formatPrice(20000000 - total)} más para envío gratis
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold text-neutral-900 mb-6">
                <span>Total</span>
                <span className="text-success-500">{formatPrice(total)}</span>
              </div>

              {/* Payment Methods */}
              <div className="mb-6 pb-6 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-900 mb-3 text-sm">Métodos de Pago</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-brand-500">✓</span>
                    <span>Crédito</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-brand-500">✓</span>
                    <span>Transferencia bancaria</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-brand-500">✓</span>
                    <span>Efectivo al recibir</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-brand-500">✓</span>
                    <span>Tarjetas débito/crédito</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <span className="text-xl">🔒</span>
                  <div>
                    <p className="font-semibold text-neutral-900">Compra Segura</p>
                    <p className="text-xs text-neutral-600">
                      Tus datos están protegidos con cifrado SSL
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Process Info */}
            <div className="bg-brand-50 rounded-lg p-6 border border-brand-200">
              <h3 className="font-bold text-neutral-900 mb-3">📱 Proceso de Compra</h3>
              <ol className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-600 shrink-0">1.</span>
                  <span>Haz clic en &quot;Finalizar por WhatsApp&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-600 shrink-0">2.</span>
                  <span>Se abrirá WhatsApp con tu pedido listo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-600 shrink-0">3.</span>
                  <span>Confirma tu dirección y método de pago</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-brand-600 shrink-0">4.</span>
                  <span>¡Recibe tu pedido en 3-5 días!</span>
                </li>
              </ol>
            </div>

            {/* WhatsApp Checkout Component */}
            <WhatsAppCheckout />
          </div>
        </div>
      </div>
    </div>
  );
}
