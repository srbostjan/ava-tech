/**
 * Cart Store using Zustand
 *
 * This store manages the shopping cart state on the client side.
 *
 * Future AWS Amplify Integration:
 * - Cart items will be synced to DynamoDB using GraphQL mutations
 * - When user is authenticated (Cognito), cart will be persisted per user
 * - GraphQL subscriptions can be used for real-time cart updates across devices
 *
 * Example future mutations:
 * - mutation CreateCartItem($input: CreateCartItemInput!) { createCartItem(input: $input) }
 * - mutation UpdateCartItem($input: UpdateCartItemInput!) { updateCartItem(input: $input) }
 * - mutation DeleteCartItem($id: ID!) { deleteCartItem(id: $id) }
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant, CartItem, Cart } from '@/lib/types';

interface CartStore extends Cart {
  // Actions
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;

  // Private methods for recalculation
  recalculate: () => void;
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.priceAtAdd * item.quantity), 0);

  // Calculate total discount based on original prices
  const totalDiscount = items.reduce((sum, item) => {
    const originalPrice = item.product.priceOriginal;
    const discountPerItem = originalPrice - item.priceAtAdd;
    return sum + (discountPerItem * item.quantity);
  }, 0);

  const total = subtotal;

  return {
    totalItems,
    subtotal,
    totalDiscount,
    total,
  };
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
            (item) =>
              item.productId === product.id &&
              item.variantId === variant?.id
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
            (item) =>
              !(item.productId === productId && item.variantId === variantId)
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

      recalculate: () => {
        set((state) => {
          const totals = calculateTotals(state.items);
          return totals;
        });
      },
    }),
    {
      name: 'cart-storage', // localStorage key
      // Future: Replace localStorage with AWS AppSync + DynamoDB
      // When user is authenticated, sync cart to cloud
    }
  )
);
