'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';

export function WhatsAppCheckout() {
  const { items, generateWhatsAppUrl, clearCart, total, totalItems } = useCartStore();
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      // Generate WhatsApp URL with message
      const whatsappUrl = generateWhatsAppUrl(customerName);

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Clear cart after 2 seconds (give time for WhatsApp to open)
      setTimeout(() => {
        clearCart();
        setCustomerName('');
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error('Error al abrir WhatsApp:', error);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-4">
      <h2 className="text-xl font-bold text-neutral-900">Finalizar Compra</h2>

      {/* Optional Name Input */}
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-neutral-700 mb-2">
          Tu nombre (opcional)
        </label>
        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Ej: Juan Pérez"
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent"
        />
        <p className="text-xs text-neutral-500 mt-1">Nos ayuda a personalizar tu atención</p>
      </div>

      {/* Preview Message Button */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="text-sm text-neutral-600 hover:text-neutral-800 underline"
      >
        {showPreview ? 'Ocultar vista previa' : 'Ver mensaje que se enviará'}
      </button>

      {/* Message Preview */}
      {showPreview && (
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
          <p className="text-xs font-semibold text-neutral-700 mb-2">Vista previa del mensaje:</p>
          <pre className="text-xs text-neutral-600 whitespace-pre-wrap font-sans">
            {customerName && `Mi nombre es ${customerName}\n\n`}
            🛒 ¡Hola! Me interesan estos productos:
            {'\n\n'}
            {items
              .map((item, index) => {
                const variantText = item.variant ? ` - ${item.variant.name}` : '';
                const price = item.priceAtAdd.toLocaleString('es-CO');
                const subtotal = (item.priceAtAdd * item.quantity).toLocaleString('es-CO');
                return `${index + 1}. ${item.product.name}${variantText}\n   📦 Cantidad: ${item.quantity}\n   💵 Precio: $${price}\n   💰 Subtotal: $${subtotal}\n\n`;
              })
              .join('')}
            💰 TOTAL: ${total.toLocaleString('es-CO')}
            {'\n\n'}
            ¿Podrían darme más información y ayudarme con la compra?
          </pre>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleCheckout}
        disabled={isSubmitting}
        className="w-full bg-whatsapp-500 text-white py-4 px-6 rounded-lg font-semibold text-lg
                   hover:bg-whatsapp-600 active:bg-whatsapp-700 disabled:bg-neutral-300 disabled:cursor-not-allowed
                   flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Abriendo WhatsApp...
          </span>
        ) : (
          <>
            Enviar pedido por WhatsApp
            <span className="text-sm font-normal">
              ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
            </span>
          </>
        )}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        Al hacer clic, se abrirá WhatsApp con tu pedido prellenado.
        <br />
        Podrás confirmar o modificar el mensaje antes de enviarlo.
      </p>
    </div>
  );
}
