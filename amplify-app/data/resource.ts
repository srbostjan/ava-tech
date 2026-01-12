import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// ==========================================
// Amplify Gen 2 Schema for E-Commerce
// with WhatsApp Checkout Flow + CMS
// ==========================================
//
// Architecture:
// - DynamoDB as data source
// - Public API key for catalog queries (guest/customer access)
// - Cognito User Pools auth for CMS operations (admin only)
// - Analytics tracking for WhatsApp inquiries
//
// Authorization Strategy:
// - Customers (public): Read-only access to products via API Key
// - Admins (authenticated): Full CRUD on products, categories, inquiries

// ------------------------------------------
// ENUMS
// ------------------------------------------

const VariantType = a.enum(['color', 'size', 'material', 'style']);

const InquirySource = a.enum(['WEB', 'MOBILE', 'PWA', 'FACEBOOK', 'INSTAGRAM']);

const InquiryStatus = a.enum(['PENDING', 'CONTACTED', 'NEGOTIATING', 'CONVERTED', 'LOST', 'SPAM']);

const ProductSort = a.enum(['RELEVANCE', 'PRICE_ASC', 'PRICE_DESC', 'NEWEST', 'POPULAR']);

// ------------------------------------------
// SCHEMA
// ------------------------------------------

const schema = a.schema({
  // Enums registration
  VariantType,
  InquirySource,
  InquiryStatus,
  ProductSort,

  // ------------------------------------------
  // PRODUCT CATALOG (Public Read-Only)
  // ------------------------------------------

  Product: a
    .model({
      sku: a.string(),
      name: a.string().required(),
      description: a.string().required(),

      // Category relationship
      categoryId: a.id().required(),
      category: a.belongsTo('Category', 'categoryId'),

      // Product details
      specs: a.json(), // Flexible JSON for specs like { "RAM": "16GB", "Processor": "i7" }
      priceOriginal: a.integer().required(), // Price in cents (e.g., 12999 = $129.99)
      priceDiscount: a.integer().required(), // Discounted price in cents
      images: a.json(), // Array of images as JSON

      // Variants relationship
      variants: a.hasMany('ProductVariant', 'productId'),

      // Featured products (for homepage) - stored as string "true"/"false" for GSI partition key
      featured: a.string().default('false'),

      // Stock (informative only, updated from CMS)
      stockCount: a.integer(),
      isAvailable: a.boolean().default(true),

      // Rating & Social Proof
      ratingAverage: a.float(),
      ratingCount: a.integer().default(0),
      viewsToday: a.integer().default(0),
      soldCount: a.integer().default(0),

      // SEO & Analytics
      slug: a.string(),
      views: a.integer().default(0),
      inquiries: a.integer().default(0),
      createdAt: a.datetime(),
    })
    .secondaryIndexes((index) => [
      index('sku').queryField('getProductBySKU').name('productBySKU'),
      index('categoryId')
        .sortKeys(['priceDiscount'])
        .queryField('listProductsByCategory')
        .name('productsByCategory'),
      index('featured')
        .sortKeys(['createdAt'])
        .queryField('listFeaturedProducts')
        .name('productsByFeatured'),
      index('slug').queryField('getProductBySlug').name('productBySlug'),
    ])
    .authorization((allow) => [
      allow.publicApiKey().to(['read']), // Public read access for customers
      allow.authenticated().to(['create', 'read', 'update', 'delete']), // Full CRUD for admins
    ]),

  ProductVariant: a
    .model({
      productId: a.id().required(),
      product: a.belongsTo('Product', 'productId'),
      name: a.string().required(), // e.g., "Titanio Natural - 256GB", "Rojo", "XL"
      type: a.ref('VariantType').required(),
      stockCount: a.integer(),
      isAvailable: a.boolean().default(true),
      images: a.json(), // Variant-specific images
    })
    .secondaryIndexes((index) => [
      index('productId').queryField('listVariantsByProduct').name('variantsByProduct'),
    ])
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),

  Category: a
    .model({
      slug: a.string(),
      name: a.string().required(),
      description: a.string(),
      imageUrl: a.string(), // S3 URL or external image
      parentCategoryId: a.id(), // For nested categories
      products: a.hasMany('Product', 'categoryId'),
      order: a.integer(), // Display order in UI
      isActive: a.boolean().default(true),
    })
    .secondaryIndexes((index) => [
      index('slug').queryField('getCategoryBySlug').name('categoryBySlug'),
    ])
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),

  // ------------------------------------------
  // WHATSAPP ANALYTICS
  // ------------------------------------------

  WhatsAppInquiry: a
    .model({
      // Anonymous identification
      sessionId: a.string().required(),
      fingerprint: a.string(), // Browser fingerprint (optional)

      // Optional customer data (captured before WhatsApp redirect)
      customerName: a.string(),
      customerEmail: a.string(),
      customerPhone: a.string(),

      // Inquiry details - JSON array: [{ productId, variantId, quantity, priceAtInquiry, productName }]
      items: a.json().required(),
      totalAmount: a.integer().required(),
      totalItems: a.integer().required(),

      // Generated WhatsApp message
      message: a.string(),

      // Metadata
      source: a.ref('InquirySource'),
      userAgent: a.string(),
      referrer: a.string(),

      // Conversion tracking (updated from CMS)
      status: a.ref('InquiryStatus'),
      convertedToSale: a.boolean().default(false),
      saleAmount: a.integer(),
      notes: a.string(), // Seller notes
    })
    .secondaryIndexes((index) => [
      index('sessionId').queryField('listInquiriesBySession').name('inquiriesBySession'),
      index('customerEmail').queryField('listInquiriesByEmail').name('inquiriesByEmail'),
    ])
    .authorization((allow) => [
      allow.publicApiKey().to(['create', 'read']), // Customers can create and view their inquiries
      allow.authenticated().to(['create', 'read', 'update', 'delete']), // Admins have full access
    ]),

  // ------------------------------------------
  // CUSTOM TYPES FOR ANALYTICS
  // ------------------------------------------

  ProductStat: a.customType({
    productId: a.id().required(),
    productName: a.string().required(),
    inquiryCount: a.integer().required(),
    revenue: a.integer().required(),
  }),

  DateStat: a.customType({
    date: a.string().required(),
    inquiries: a.integer().required(),
    revenue: a.integer().required(),
  }),

  InquiryStats: a.customType({
    totalInquiries: a.integer().required(),
    totalRevenue: a.integer().required(),
    conversionRate: a.float().required(),
    topProducts: a.ref('ProductStat').array(),
    inquiriesByDate: a.ref('DateStat').array(),
  }),

  // Note: ProductConnection is auto-generated by Amplify for model pagination
  // No need to define it manually

  ProductFilterInput: a.customType({
    categoryId: a.id(),
    minPrice: a.integer(),
    maxPrice: a.integer(),
    searchQuery: a.string(),
    isAvailable: a.boolean(),
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey', // Default for public/customer access
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
    // Cognito User Pools for admin authentication
  },
});

// ------------------------------------------
// CLIENT USAGE EXAMPLES
// ------------------------------------------

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

// List all products
const { data: products } = await client.models.Product.list();

// Get product by slug
const { data: product } = await client.models.Product.getProductBySlug({
  slug: "iphone-15-pro"
});

// List products by category with price sorting
const { data: categoryProducts } = await client.models.Product.listProductsByCategory({
  categoryId: "CATEGORY_ID"
});

// List featured products
const { data: featured } = await client.models.Product.listFeaturedProducts({
  featured: true
});

// Create WhatsApp inquiry (tracking)
const { data: inquiry } = await client.models.WhatsAppInquiry.create({
  sessionId: "unique-session-id",
  items: JSON.stringify([
    { productId: "prod-1", variantId: "var-1", quantity: 2, priceAtInquiry: 9999, productName: "iPhone 15 Pro" }
  ]),
  totalAmount: 19998,
  totalItems: 2,
  message: "Hola! Me interesan estos productos...",
  source: "WEB"
});

// Get product with variants (eager loading)
const { data: productWithVariants } = await client.models.Product.get(
  { id: "PRODUCT_ID" },
  { selectionSet: ["id", "name", "variants.*"] }
);

// Get category with products
const { data: categoryWithProducts } = await client.models.Category.get(
  { id: "CATEGORY_ID" },
  { selectionSet: ["id", "name", "products.*"] }
);
*/
