/**
 * Utility functions for formatting data
 */

// Format price in cents to display format (e.g., 12999 -> "$129.99")
export const formatPrice = (cents: number): string => {
  const dollars = cents / 100;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(dollars);
};

// Calculate discount percentage
export const calculateDiscountPercentage = (original: number, discount: number): number => {
  if (original <= 0) return 0;
  return Math.round(((original - discount) / original) * 100);
};

// Format WhatsApp URL with message
export const formatWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  // Remove non-numeric characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

// Generate WhatsApp message for cart checkout
export const generateCartWhatsAppMessage = (
  items: Array<{
    name: string;
    quantity: number;
    variant?: string;
    price: number;
  }>,
): string => {
  let message = '¡Hola! Me gustaría hacer un pedido:\n\n';

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`;
    if (item.variant) {
      message += ` (${item.variant})`;
    }
    message += ` - Cantidad: ${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`;
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal: ${formatPrice(total)}\n\n¡Gracias!`;

  return message;
};

// Generate WhatsApp message for single product inquiry
export const generateProductWhatsAppMessage = (productName: string, variant?: string): string => {
  let message = `¡Hola! Me interesa el producto: ${productName}`;
  if (variant) {
    message += ` (${variant})`;
  }
  message += '. ¿Podrías darme más información?';
  return message;
};

// Default WhatsApp message for general inquiry
export const getDefaultWhatsAppMessage = (): string => {
  return '¡Hola! Quisiera más información sobre sus productos.';
};
