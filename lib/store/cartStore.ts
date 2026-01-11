import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product, ProductVariant, CartItem, Cart } from '@/lib/types';

interface CartStore extends Cart {
  // Actions
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;

  // WhatsApp Integration
  generateWhatsAppMessage: () => string;
  generateWhatsAppUrl: (customerName?: string) => string;

  // Analytics (optional - for future AppSync integration)
  getAnalyticsData: () => {
    sessionId: string;
    items: Array<{
      productId: string;
      productName: string;
      variantId?: string;
      variantName?: string;
      quantity: number;
      priceAtInquiry: number;
    }>;
    totalAmount: number;
    totalItems: number;
  };

  // Private methods for recalculation
  recalculate: () => void;
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.priceAtAdd * item.quantity, 0);

  // Calculate total discount based on original prices
  const totalDiscount = items.reduce((sum, item) => {
    const originalPrice = item.product.priceOriginal;
    const discountPerItem = originalPrice - item.priceAtAdd;
    return sum + discountPerItem * item.quantity;
  }, 0);

  const total = subtotal;

  return {
    totalItems,
    subtotal,
    totalDiscount,
    total,
  };
};

// Get or create session ID for analytics
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    // Generate UUID v4
    sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      totalDiscount: 0,
      total: 0,

      addItem: (product: Product, variant?: ProductVariant, quantity: number = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === product.id && item.variantId === variant?.id,
          );

          let newItems: CartItem[];

          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
          } else {
            // Add new item
            const newItem: CartItem = {
              productId: product.id,
              product: product,
              variantId: variant?.id,
              variant: variant,
              quantity: quantity,
              priceAtAdd: product.priceDiscount, // Use discounted price
            };
            newItems = [...state.items, newItem];
          }

          const totals = calculateTotals(newItems);

          return {
            items: newItems,
            ...totals,
          };
        });
      },

      removeItem: (productId: string, variantId?: string) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => !(item.productId === productId && item.variantId === variantId),
          );

          const totals = calculateTotals(newItems);

          return {
            items: newItems,
            ...totals,
          };
        });
      },

      updateQuantity: (productId: string, quantity: number, variantId?: string) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.productId === productId && item.variantId === variantId) {
              return { ...item, quantity: Math.max(1, quantity) };
            }
            return item;
          });

          const totals = calculateTotals(newItems);

          return {
            items: newItems,
            ...totals,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
          totalDiscount: 0,
          total: 0,
        });
      },

      // ✅ NEW: Generate WhatsApp message
      generateWhatsAppMessage: () => {
        const state = get();
        const items = state.items;

        if (items.length === 0) {
          return '¡Hola! Me gustaría obtener más información sobre sus productos.';
        }

        let message = '🛒 *¡Hola! Me interesan estos productos:*\n\n';

        items.forEach((item, index) => {
          const variantText = item.variant ? ` - ${item.variant.name}` : '';
          const price = (item.priceAtAdd / 100).toFixed(2);
          const subtotal = ((item.priceAtAdd * item.quantity) / 100).toFixed(2);

          message += `*${index + 1}. ${item.product.name}*${variantText}\n`;
          message += `   📦 Cantidad: ${item.quantity}\n`;
          message += `   💵 Precio: $${price}\n`;
          message += `   💰 Subtotal: $${subtotal}\n\n`;
        });

        const total = (state.total / 100).toFixed(2);
        const discount = (state.totalDiscount / 100).toFixed(2);

        if (state.totalDiscount > 0) {
          message += `🎉 *Ahorro total: $${discount}*\n`;
        }

        message += `💰 *TOTAL: $${total}*\n\n`;
        message += '¿Podrían darme más información y ayudarme con la compra?';

        return message;
      },

      // ✅ NEW: Generate WhatsApp URL with pre-filled message
      generateWhatsAppUrl: (customerName?: string) => {
        const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573116882763';
        let message = get().generateWhatsAppMessage();

        // Add customer name if provided
        if (customerName?.trim()) {
          message = `Mi nombre es *${customerName.trim()}*\n\n${message}`;
        }

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      },

      // ✅ NEW: Get analytics data (for future AppSync integration)
      getAnalyticsData: () => {
        const state = get();

        return {
          sessionId: getSessionId(),
          items: state.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            variantId: item.variantId,
            variantName: item.variant?.name,
            quantity: item.quantity,
            priceAtInquiry: item.priceAtAdd,
          })),
          totalAmount: state.total,
          totalItems: state.totalItems,
        };
      },

      recalculate: () => {
        set((state) => {
          const totals = calculateTotals(state.items);
          return totals;
        });
      },
    }),
    {
      name: 'cart-storage', // localStorage key
      // Cart persists in localStorage
      // When AppSync is integrated, we can sync to cloud using getAnalyticsData()
    },
  ),
);
