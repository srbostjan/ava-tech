import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// ==========================================
// Amplify Gen 2 Schema for E-Commerce
// with WhatsApp Checkout Flow
// ==========================================
//
// Architecture:
// - DynamoDB as data source
// - Public API key for catalog queries (guest access)
// - IAM auth for CMS operations (create/update products)
// - Analytics tracking for WhatsApp inquiries

// ------------------------------------------
// ENUMS
// ------------------------------------------

const VariantType = a.enum(['COLOR', 'SIZE', 'MATERIAL', 'STYLE']);

const InquirySource = a.enum(['WEB', 'MOBILE', 'PWA', 'FACEBOOK', 'INSTAGRAM']);

const InquiryStatus = a.enum([
  'PENDING', // Just created
  'CONTACTED', // Customer contacted via WhatsApp
  'NEGOTIATING', // In negotiation
  'CONVERTED', // Sale completed
  'LOST', // Did not convert
  'SPAM', // Invalid inquiry
]);

const ProductSort = a.enum(['RELEVANCE', 'PRICE_ASC', 'PRICE_DESC', 'NEWEST', 'POPULAR']);

// ------------------------------------------
// SCHEMA DEFINITION
// ------------------------------------------

const schema = a.schema({
  // Enums
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

      // Variants (colors, sizes, etc.)
      variants: a.hasMany('ProductVariant', 'productId'),

      // Featured products (for homepage)
      featured: a.string(), // Use 'true'/'false' string values for indexing

      // Stock (informative only, updated from CMS)
      stockAvailable: a.integer(),
      isAvailable: a.boolean(), // true/false to show "Out of Stock"

      // SEO & Analytics
      slug: a.string(), // URL-friendly name
      views: a.integer(), // Incremented when product is viewed
      inquiries: a.integer(), // How many times added to WhatsApp inquiries

      createdAt: a.datetime().required(),
    })
    .secondaryIndexes((index) => [
      index('sku').name('productBySKU'),
      index('categoryId').sortKeys(['priceDiscount']).name('productsByCategory'),
      index('featured').sortKeys(['createdAt']).name('productsByFeatured'),
      index('slug').name('productBySlug'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated('identityPool').to(['create', 'update', 'delete', 'read']),
    ]),

  ProductVariant: a
    .model({
      productId: a.id().required(),
      product: a.belongsTo('Product', 'productId'),
      name: a.string().required(), // e.g., "Titanio Natural - 256GB", "Rojo", "XL"
      type: a.ref('VariantType').required(),
      stockAvailable: a.integer(),
      isAvailable: a.boolean(),
      images: a.json(), // Variant-specific images
    })
    .secondaryIndexes((index) => [index('productId').name('variantsByProduct')])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated('identityPool').to(['create', 'update', 'delete', 'read']),
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
      isActive: a.boolean(),
    })
    .secondaryIndexes((index) => [index('slug').name('categoryBySlug')])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated('identityPool').to(['create', 'update', 'delete', 'read']),
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

      // Inquiry details
      items: a.json().required(), // [{ productId, variantId, quantity, priceAtInquiry, productName }]
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
      convertedToSale: a.boolean(),
      saleAmount: a.integer(),
      notes: a.string(), // Seller notes
      createdAt: a.datetime().required(),
    })
    .secondaryIndexes((index) => [
      index('sessionId').name('inquiriesBySession'),
      index('customerEmail').name('inquiriesByEmail'),
      index('createdAt').sortKeys(['totalAmount']).name('inquiriesByDate'),
    ])
    .authorization((allow) => [
      allow.guest().to(['create']), // Anyone can create
      allow.authenticated('identityPool').to(['create', 'read', 'update', 'delete']), // CMS can read/update
    ]),

  // ------------------------------------------
  // CUSTOM TYPES (for query responses)
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
    topProducts: a.ref('ProductStat').array().required(),
    inquiriesByDate: a.ref('DateStat').array().required(),
  }),

  ProductConnection: a.customType({
    items: a.ref('Product').array().required(),
    nextToken: a.string(),
    total: a.integer(),
  }),

  // ------------------------------------------
  // CUSTOM QUERIES (Lambda Functions)
  // ------------------------------------------

  // Search products with filters
  searchProducts: a
    .query()
    .arguments({
      categoryId: a.id(),
      minPrice: a.integer(),
      maxPrice: a.integer(),
      searchQuery: a.string(),
      isAvailable: a.boolean(),
      sort: a.ref('ProductSort'),
      limit: a.integer(),
      nextToken: a.string(),
    })
    .returns(a.ref('ProductConnection'))
    .authorization((allow) => [allow.guest()])
    .handler(a.handler.function('searchProducts')),

  // Get related products
  getRelatedProducts: a
    .query()
    .arguments({
      productId: a.id().required(),
      limit: a.integer(),
    })
    .returns(a.ref('Product').array())
    .authorization((allow) => [allow.guest()])
    .handler(a.handler.function('getRelatedProducts')),

  // Get inquiry stats (CMS only)
  getInquiryStats: a
    .query()
    .arguments({
      startDate: a.datetime().required(),
      endDate: a.datetime().required(),
    })
    .returns(a.ref('InquiryStats'))
    .authorization((allow) => [allow.authenticated('identityPool')])
    .handler(a.handler.function('getInquiryStats')),

  // ------------------------------------------
  // CUSTOM MUTATIONS (Lambda Functions)
  // ------------------------------------------

  // Increment product views (analytics)
  incrementProductViews: a
    .mutation()
    .arguments({
      productId: a.id().required(),
    })
    .returns(a.ref('Product'))
    .authorization((allow) => [allow.guest()])
    .handler(a.handler.function('incrementProductViews')),

  // CMS: Update product stock
  updateProductStock: a
    .mutation()
    .arguments({
      productId: a.id().required(),
      stockAvailable: a.integer().required(),
      isAvailable: a.boolean().required(),
    })
    .returns(a.ref('Product'))
    .authorization((allow) => [allow.authenticated('identityPool')])
    .handler(a.handler.function('updateProductStock')),

  // CMS: Update inquiry status
  updateInquiryStatus: a
    .mutation()
    .arguments({
      inquiryId: a.id().required(),
      status: a.ref('InquiryStatus').required(),
      convertedToSale: a.boolean(),
      saleAmount: a.integer(),
      notes: a.string(),
    })
    .returns(a.ref('WhatsAppInquiry'))
    .authorization((allow) => [allow.authenticated('identityPool')])
    .handler(a.handler.function('updateInquiryStatus')),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool', // Guest access by default (API Key equivalent)
    // API key mode for truly public access
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 365,
    // },
  },
});
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
