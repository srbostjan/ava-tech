/**
 * Mock Products Data
 *
 * In production, this data will come from DynamoDB via AppSync GraphQL API
 * Image URLs simulate S3 bucket structure: s3://ecommerce-bucket/products/{productId}/...
 *
 * Future implementation will replace these with actual S3 URLs:
 * - Main images: s3://ecommerce-bucket/products/{productId}/main.jpg
 * - Gallery: s3://ecommerce-bucket/products/{productId}/gallery/image_{n}.jpg
 * - Variants: s3://ecommerce-bucket/products/{productId}/variants/{variantId}/image_{n}.jpg
 */

import { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Laptop HP Pavilion 15"',
    description:
      'Laptop de alto rendimiento con procesador Intel Core i7, 16GB RAM y 512GB SSD. Ideal para trabajo profesional, edición de video y gaming ligero. Pantalla Full HD de 15.6 pulgadas con tecnología IPS para colores vibrantes y amplios ángulos de visión.',
    categoryId: 'cat-001',
    priceOriginal: 129999,
    priceDiscount: 97499,
    featured: true,
    specs: [
      { key: 'Procesador', value: 'Intel Core i7-12700H' },
      { key: 'RAM', value: '16GB DDR4' },
      { key: 'Almacenamiento', value: '512GB SSD NVMe' },
      { key: 'Pantalla', value: '15.6" Full HD IPS' },
      { key: 'Gráficos', value: 'Intel Iris Xe Graphics' },
      { key: 'Sistema Operativo', value: 'Windows 11 Home' },
      { key: 'Batería', value: 'Hasta 8 horas' },
      { key: 'Peso', value: '1.75 kg' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        isThumbnail: true,
        alt: 'Laptop HP Pavilion vista frontal',
      },
      {
        url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        alt: 'Laptop HP Pavilion teclado',
      },
      {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        alt: 'Laptop HP Pavilion lateral',
      },
    ],
    variants: [
      {
        id: 'var-001-silver',
        name: 'Plata',
        type: 'color',
        stockAvailable: 15,
      },
      {
        id: 'var-001-black',
        name: 'Negro',
        type: 'color',
        stockAvailable: 8,
      },
    ],
  },
  {
    id: 'prod-002',
    name: 'Smartphone Samsung Galaxy S23',
    description:
      'El smartphone más avanzado de Samsung con cámara de 50MP, pantalla Dynamic AMOLED 2X y procesador Snapdragon 8 Gen 2. Experimenta velocidades 5G ultrarrápidas y un diseño elegante que se adapta a tu estilo de vida.',
    categoryId: 'cat-001',
    priceOriginal: 99999,
    priceDiscount: 84999,
    featured: true,
    specs: [
      { key: 'Pantalla', value: '6.1" Dynamic AMOLED 2X' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 2' },
      { key: 'RAM', value: '8GB' },
      { key: 'Almacenamiento', value: '256GB' },
      { key: 'Cámara Principal', value: '50MP + 12MP + 10MP' },
      { key: 'Cámara Frontal', value: '12MP' },
      { key: 'Batería', value: '3900mAh' },
      { key: 'Conectividad', value: '5G, WiFi 6E, Bluetooth 5.3' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
        isThumbnail: true,
        alt: 'Samsung Galaxy S23',
      },
      {
        url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
        alt: 'Samsung Galaxy S23 cámara',
      },
    ],
    variants: [
      {
        id: 'var-002-phantom-black',
        name: 'Phantom Black',
        type: 'color',
        stockAvailable: 20,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
            variantId: 'var-002-phantom-black',
            alt: 'Samsung S23 Negro',
          },
        ],
      },
      {
        id: 'var-002-cream',
        name: 'Cream',
        type: 'color',
        stockAvailable: 12,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
            variantId: 'var-002-cream',
            alt: 'Samsung S23 Cream',
          },
        ],
      },
      {
        id: 'var-002-lavender',
        name: 'Lavender',
        type: 'color',
        stockAvailable: 5,
      },
    ],
  },
  {
    id: 'prod-003',
    name: 'Auriculares Sony WH-1000XM5',
    description:
      'Auriculares inalámbricos con la mejor cancelación de ruido del mercado. Disfruta de un sonido premium con 30 horas de batería y comodidad excepcional para todo el día.',
    categoryId: 'cat-001',
    priceOriginal: 39999,
    priceDiscount: 31999,
    featured: true,
    specs: [
      { key: 'Tipo', value: 'Over-ear inalámbricos' },
      { key: 'Cancelación de ruido', value: 'Activa (ANC)' },
      { key: 'Batería', value: 'Hasta 30 horas' },
      { key: 'Conectividad', value: 'Bluetooth 5.2, NFC' },
      { key: 'Codec', value: 'LDAC, AAC, SBC' },
      { key: 'Peso', value: '250g' },
      { key: 'Carga rápida', value: '3 min = 3 horas' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
        isThumbnail: true,
        alt: 'Sony WH-1000XM5',
      },
      {
        url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
        alt: 'Sony WH-1000XM5 detalle',
      },
    ],
    variants: [
      {
        id: 'var-003-black',
        name: 'Negro',
        type: 'color',
        stockAvailable: 25,
      },
      {
        id: 'var-003-silver',
        name: 'Plata',
        type: 'color',
        stockAvailable: 18,
      },
    ],
  },
  {
    id: 'prod-004',
    name: 'Camiseta Polo Clásica',
    description:
      'Camiseta polo de algodón 100% premium, perfecta para cualquier ocasión. Diseño clásico y atemporal con ajuste regular y acabados de calidad.',
    categoryId: 'cat-002',
    priceOriginal: 4999,
    priceDiscount: 3499,
    featured: false,
    specs: [
      { key: 'Material', value: '100% Algodón Pima' },
      { key: 'Cuello', value: 'Polo con botones' },
      { key: 'Ajuste', value: 'Regular' },
      { key: 'Cuidado', value: 'Lavado a máquina' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800',
        isThumbnail: true,
        alt: 'Camiseta Polo',
      },
    ],
    variants: [
      {
        id: 'var-004-navy-s',
        name: 'Azul Marino - S',
        type: 'color',
        stockAvailable: 10,
      },
      {
        id: 'var-004-navy-m',
        name: 'Azul Marino - M',
        type: 'color',
        stockAvailable: 15,
      },
      {
        id: 'var-004-navy-l',
        name: 'Azul Marino - L',
        type: 'color',
        stockAvailable: 12,
      },
      {
        id: 'var-004-white-m',
        name: 'Blanco - M',
        type: 'color',
        stockAvailable: 8,
      },
      {
        id: 'var-004-white-l',
        name: 'Blanco - L',
        type: 'color',
        stockAvailable: 6,
      },
    ],
  },
  {
    id: 'prod-005',
    name: 'Zapatillas Running Nike Air Zoom',
    description:
      'Zapatillas de running de alto rendimiento con tecnología Air Zoom para mayor amortiguación. Diseño ligero y transpirable para carreras de larga distancia.',
    categoryId: 'cat-004',
    priceOriginal: 12999,
    priceDiscount: 9749,
    featured: true,
    specs: [
      { key: 'Tecnología', value: 'Nike Air Zoom' },
      { key: 'Tipo', value: 'Running neutral' },
      { key: 'Drop', value: '10mm' },
      { key: 'Peso', value: '280g (talla 9 US)' },
      { key: 'Uso', value: 'Largas distancias' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        isThumbnail: true,
        alt: 'Nike Air Zoom',
      },
      {
        url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
        alt: 'Nike Air Zoom lateral',
      },
    ],
    variants: [
      {
        id: 'var-005-black-9',
        name: 'Negro - 9 US',
        type: 'size',
        stockAvailable: 7,
      },
      {
        id: 'var-005-black-10',
        name: 'Negro - 10 US',
        type: 'size',
        stockAvailable: 12,
      },
      {
        id: 'var-005-white-9',
        name: 'Blanco - 9 US',
        type: 'size',
        stockAvailable: 5,
      },
      {
        id: 'var-005-white-10',
        name: 'Blanco - 10 US',
        type: 'size',
        stockAvailable: 9,
      },
    ],
  },
  {
    id: 'prod-006',
    name: 'Cafetera Espresso Delonghi',
    description:
      'Cafetera espresso profesional para preparar el café perfecto en casa. Sistema de bomba de 15 bares y vaporizador para capuccinos cremosos.',
    categoryId: 'cat-003',
    priceOriginal: 29999,
    priceDiscount: 23999,
    featured: false,
    specs: [
      { key: 'Presión', value: '15 bares' },
      { key: 'Capacidad', value: '1.4 litros' },
      { key: 'Potencia', value: '1350W' },
      { key: 'Vaporizador', value: 'Sí' },
      { key: 'Filtro', value: 'Doble salida' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
        isThumbnail: true,
        alt: 'Cafetera Espresso',
      },
    ],
    variants: [
      {
        id: 'var-006-stainless',
        name: 'Acero Inoxidable',
        type: 'material',
        stockAvailable: 8,
      },
      {
        id: 'var-006-black',
        name: 'Negro Mate',
        type: 'material',
        stockAvailable: 6,
      },
    ],
  },
  {
    id: 'prod-007',
    name: 'Libro: El Arte de la Guerra',
    description:
      'Edición de lujo del clásico tratado de estrategia militar de Sun Tzu. Incluye comentarios y análisis modernos sobre su aplicación en negocios y vida personal.',
    categoryId: 'cat-005',
    priceOriginal: 2499,
    priceDiscount: 1999,
    featured: false,
    specs: [
      { key: 'Autor', value: 'Sun Tzu' },
      { key: 'Editorial', value: 'Penguin Classics' },
      { key: 'Páginas', value: '320' },
      { key: 'Idioma', value: 'Español' },
      { key: 'Encuadernación', value: 'Tapa dura' },
      { key: 'ISBN', value: '978-0143105756' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
        isThumbnail: true,
        alt: 'El Arte de la Guerra',
      },
    ],
    variants: [
      {
        id: 'var-007-hardcover',
        name: 'Tapa Dura',
        type: 'style',
        stockAvailable: 20,
      },
      {
        id: 'var-007-paperback',
        name: 'Tapa Blanda',
        type: 'style',
        stockAvailable: 35,
      },
    ],
  },
  {
    id: 'prod-008',
    name: 'Smartwatch Apple Watch Series 9',
    description:
      'El smartwatch más avanzado de Apple con pantalla Always-On Retina, sensores de salud avanzados y resistencia al agua. Monitorea tu salud, fitness y mantente conectado.',
    categoryId: 'cat-001',
    priceOriginal: 44999,
    priceDiscount: 39999,
    featured: true,
    specs: [
      { key: 'Pantalla', value: 'Always-On Retina LTPO OLED' },
      { key: 'Tamaño', value: '41mm / 45mm' },
      { key: 'Chip', value: 'Apple S9' },
      { key: 'Sensores', value: 'ECG, SpO2, Temperatura' },
      { key: 'Resistencia', value: 'WR50 (50m)' },
      { key: 'Batería', value: 'Hasta 18 horas' },
      { key: 'GPS', value: 'Sí' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
        isThumbnail: true,
        alt: 'Apple Watch Series 9',
      },
      {
        url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
        alt: 'Apple Watch detalle pantalla',
      },
    ],
    variants: [
      {
        id: 'var-008-41-midnight',
        name: '41mm Medianoche',
        type: 'size',
        stockAvailable: 10,
      },
      {
        id: 'var-008-45-midnight',
        name: '45mm Medianoche',
        type: 'size',
        stockAvailable: 8,
      },
      {
        id: 'var-008-41-starlight',
        name: '41mm Starlight',
        type: 'size',
        stockAvailable: 6,
      },
      {
        id: 'var-008-45-starlight',
        name: '45mm Starlight',
        type: 'size',
        stockAvailable: 7,
      },
    ],
  },
];

/**
 * Helper functions for querying mock data
 * These simulate GraphQL queries that will be implemented with AppSync
 */

// Get product by ID (simulates: query GetProduct($id: ID!))
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((p) => p.id === id);
};

// List featured products (simulates: query ListProducts($filter: { featured: true }))
export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter((p) => p.featured);
};

// List products by category (simulates: query ListProducts($filter: { categoryId: $categoryId }))
export const getProductsByCategory = (categoryId: string): Product[] => {
  return mockProducts.filter((p) => p.categoryId === categoryId);
};

// Search products (simulates: query SearchProducts($query: String!))
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ?? p.description.toLowerCase().includes(lowerQuery),
  );
};

// Filter products with multiple criteria
export const filterProducts = (filters: {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}): Product[] => {
  let results = [...mockProducts];

  if (filters.categoryId) {
    results = results.filter((p) => p.categoryId === filters.categoryId);
  }

  if (filters.minPrice !== undefined) {
    results = results.filter((p) => p.priceDiscount >= (filters.minPrice ?? 0));
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter((p) => p.priceDiscount <= (filters.maxPrice ?? 0));
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    results = results.filter(
      (p) => p.name.toLowerCase().includes(query) ?? p.description.toLowerCase().includes(query),
    );
  }

  return results;
};

// Calculate discount percentage
export const calculateDiscountPercentage = (original: number, discount: number): number => {
  if (original <= 0) return 0;
  return Math.round(((original - discount) / original) * 100);
};
