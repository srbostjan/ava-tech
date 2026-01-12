/**
 * Core types for the E-commerce application
 *
 * These types are designed to be compatible with AWS AppSync GraphQL schema
 * that will be implemented in the future backend integration.
 *
 * @see BACKEND_SETUP.md for GraphQL schema and DynamoDB table design
 */

// Product Specification (e.g., technical specs like "Processor: Intel i7")
export interface ProductSpec {
  key: string;
  value: string;
}

// Product Image (simulating S3 bucket structure)
export interface ProductImage {
  url: string; // Mock URL simulating S3: s3://bucket/products/{productId}/...
  isThumbnail?: boolean;
  variantId?: string; // Links image to specific variant
  alt?: string;
}

// Product Variant (e.g., different colors, sizes)
export type VariantType = 'color' | 'size' | 'material' | 'style';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Rojo", "XL", "Acero inoxidable"
  type: VariantType;
  stockCount?: number; // Available stock (will come from DynamoDB)
  images?: ProductImage[]; // Each variant can have its own images
}

// Product Review
export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userLocation?: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string;
  verified?: boolean; // Verified purchase
}

// Product Rating Summary
export interface ProductRating {
  averageRating: number; // 0-5
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Main Product entity
export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  specs: ProductSpec[];
  priceOriginal: number; // Price in COP (Colombian Pesos), e.g., 1299990 = $1,299,990
  priceDiscount: number; // Discounted price in COP
  images: ProductImage[];
  variants: ProductVariant[];
  featured?: boolean; // For showing on home page (Note: stored as "true"/"false" string in DynamoDB for GSI)
  rating?: ProductRating; // Product rating summary
  stockCount?: number; // Available stock (for urgency signals)
  viewsToday?: number; // Views today (for social proof)
  soldCount?: number; // Total units sold
  ratingAverage?: number; // Average rating (0-5)
  ratingCount?: number; // Total number of ratings
  createdAt?: string; // ISO date string - will be managed by DynamoDB
  updatedAt?: string; // ISO date string - will be managed by DynamoDB
}

// Category entity
export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategoryId?: string; // For nested categories in the future
  order?: number; // Display order in UI
  isActive?: boolean; // Whether category is visible
}

// Cart Item (what user adds to cart)
export interface CartItem {
  productId: string;
  product: Product; // Denormalized for easy display
  variantId?: string; // Selected variant (if applicable)
  variant?: ProductVariant;
  quantity: number;
  priceAtAdd: number; // Price when added (in case it changes later)
}

// Cart state
export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  totalDiscount: number;
  total: number;
}

// Search/Filter parameters
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  featured?: boolean;
}

// For future GraphQL integration
export interface PaginationInput {
  limit?: number;
  nextToken?: string;
}

export interface PaginatedProducts {
  items: Product[];
  nextToken?: string;
}

/**
 * Future GraphQL types (will replace current mock data)
 *
 * These interfaces represent the expected GraphQL responses from AppSync:
 *
 * query GetProduct($id: ID!) {
 *   getProduct(id: $id) { ...ProductFields }
 * }
 *
 * query ListProducts($filter: ProductFilterInput, $limit: Int, $nextToken: String) {
 *   listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
 *     items { ...ProductFields }
 *     nextToken
 *   }
 * }
 *
 * mutation CreateCartItem($input: CreateCartItemInput!) {
 *   createCartItem(input: $input) { ...CartItemFields }
 * }
 */
