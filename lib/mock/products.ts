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

import { Product, ProductRating } from '@/lib/types';

// Helper to generate realistic ratings
const generateRating = (avgRating: number, totalReviews: number): ProductRating => {
  const fiveStar = Math.floor(totalReviews * 0.6);
  const fourStar = Math.floor(totalReviews * 0.25);
  const threeStar = Math.floor(totalReviews * 0.1);
  const twoStar = Math.floor(totalReviews * 0.03);
  const oneStar = totalReviews - fiveStar - fourStar - threeStar - twoStar;

  return {
    averageRating: avgRating,
    totalReviews,
    distribution: {
      5: fiveStar,
      4: fourStar,
      3: threeStar,
      2: twoStar,
      1: oneStar,
    },
  };
};

export const mockProducts: Product[] = [
  // ========================================
  // CELULARES (10 productos)
  // ========================================
  {
    id: 'cel-001',
    name: 'iPhone 15 Pro Max',
    description:
      'El iPhone más avanzado con chip A17 Pro, cámara de 48MP con zoom óptico 5x y pantalla Super Retina XDR de 6.7". Diseño en titanio aeroespacial ultra resistente.',
    categoryId: 'celulares',
    priceOriginal: 1299990,
    priceDiscount: 1199990,
    featured: true,
    rating: generateRating(4.8, 156),
    stockCount: 8,
    viewsToday: 47,
    soldCount: 234,
    specs: [
      { key: 'Pantalla', value: '6.7" Super Retina XDR OLED' },
      { key: 'Procesador', value: 'A17 Pro' },
      { key: 'RAM', value: '8GB' },
      { key: 'Almacenamiento', value: '256GB/512GB/1TB' },
      { key: 'Cámara Principal', value: '48MP + 12MP + 12MP (Zoom 5x)' },
      { key: 'Batería', value: 'Hasta 29 horas de video' },
      { key: 'Material', value: 'Titanio grado 5' },
      { key: '5G', value: 'Sí' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        isThumbnail: true,
        alt: 'iPhone 15 Pro Max',
      },
      {
        url: 'https://images.unsplash.com/photo-1695048064940-720262b0e8d6?w=800',
        alt: 'iPhone 15 Pro Max cámara',
      },
    ],
    variants: [
      {
        id: 'cel-001-titanio-256',
        name: 'Titanio Natural - 256GB',
        type: 'color',
        stockCount: 15,
      },
      {
        id: 'cel-001-titanio-512',
        name: 'Titanio Natural - 512GB',
        type: 'color',
        stockCount: 10,
      },
      { id: 'cel-001-azul-256', name: 'Titanio Azul - 256GB', type: 'color', stockCount: 12 },
    ],
  },
  {
    id: 'cel-002',
    name: 'Samsung Galaxy S24 Ultra',
    description:
      'Potencia extrema con el procesador Snapdragon 8 Gen 3, cámara de 200MP con zoom espacial 100x, S Pen integrado y pantalla Dynamic AMOLED 2X de 6.8".',
    categoryId: 'celulares',
    priceOriginal: 1199990,
    priceDiscount: 1099990,
    featured: true,
    rating: generateRating(4.7, 203),
    stockCount: 12,
    viewsToday: 68,
    soldCount: 312,
    specs: [
      { key: 'Pantalla', value: '6.8" Dynamic AMOLED 2X 120Hz' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 3' },
      { key: 'RAM', value: '12GB' },
      { key: 'Almacenamiento', value: '256GB/512GB/1TB' },
      { key: 'Cámara', value: '200MP + 50MP + 12MP + 10MP' },
      { key: 'Batería', value: '5000mAh' },
      { key: 'S Pen', value: 'Incluido' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
        isThumbnail: true,
        alt: 'Samsung Galaxy S24 Ultra',
      },
    ],
    variants: [
      { id: 'cel-002-black-256', name: 'Phantom Black - 256GB', type: 'color', stockCount: 20 },
      {
        id: 'cel-002-violet-512',
        name: 'Titanium Violet - 512GB',
        type: 'color',
        stockCount: 8,
      },
    ],
  },
  {
    id: 'cel-003',
    name: 'Xiaomi 14 Pro',
    description:
      'Flagship de Xiaomi con cámara Leica, procesador Snapdragon 8 Gen 3, carga rápida de 120W y pantalla AMOLED de 6.73" con resolución 2K.',
    categoryId: 'celulares',
    priceOriginal: 899990,
    priceDiscount: 799990,
    featured: true,
    rating: generateRating(4.6, 128),
    stockCount: 5,
    viewsToday: 34,
    soldCount: 187,
    specs: [
      { key: 'Pantalla', value: '6.73" AMOLED 2K 120Hz' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 3' },
      { key: 'RAM', value: '12GB' },
      { key: 'Almacenamiento', value: '512GB' },
      { key: 'Cámara', value: '50MP Leica (triple cámara)' },
      { key: 'Batería', value: '4880mAh' },
      { key: 'Carga rápida', value: '120W HyperCharge' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
        isThumbnail: true,
        alt: 'Xiaomi 14 Pro',
      },
    ],
    variants: [
      { id: 'cel-003-black', name: 'Negro Titanio', type: 'color', stockCount: 15 },
      { id: 'cel-003-white', name: 'Blanco Ceramic', type: 'color', stockCount: 10 },
    ],
  },
  {
    id: 'cel-004',
    name: 'Google Pixel 8 Pro',
    description:
      'Experiencia Android pura con el chip Google Tensor G3, cámara con IA avanzada de 50MP, pantalla LTPO OLED de 6.7" y 7 años de actualizaciones garantizadas.',
    categoryId: 'celulares',
    priceOriginal: 999990,
    priceDiscount: 899990,
    featured: false,
    specs: [
      { key: 'Pantalla', value: '6.7" LTPO OLED 120Hz' },
      { key: 'Procesador', value: 'Google Tensor G3' },
      { key: 'RAM', value: '12GB' },
      { key: 'Almacenamiento', value: '128GB/256GB/512GB' },
      { key: 'Cámara', value: '50MP + 48MP + 48MP' },
      { key: 'IA', value: 'Magic Eraser, Best Take, Audio Magic' },
      { key: 'Actualizaciones', value: '7 años' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        isThumbnail: true,
        alt: 'Google Pixel 8 Pro',
      },
    ],
    variants: [
      { id: 'cel-004-obsidian', name: 'Obsidian - 256GB', type: 'color', stockCount: 12 },
      { id: 'cel-004-bay', name: 'Bay Blue - 256GB', type: 'color', stockCount: 8 },
    ],
  },
  {
    id: 'cel-005',
    name: 'OnePlus 12',
    description:
      'Flagship killer con Snapdragon 8 Gen 3, pantalla ProXDR de 6.82", cámara Hasselblad de 50MP y carga SuperVOOC de 100W que carga al 100% en 26 minutos.',
    categoryId: 'celulares',
    priceOriginal: 799990,
    priceDiscount: 699990,
    featured: false,
    specs: [
      { key: 'Pantalla', value: '6.82" AMOLED ProXDR 120Hz' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 3' },
      { key: 'RAM', value: '16GB LPDDR5X' },
      { key: 'Almacenamiento', value: '512GB UFS 4.0' },
      { key: 'Cámara', value: '50MP Hasselblad (triple)' },
      { key: 'Batería', value: '5400mAh' },
      { key: 'Carga', value: '100W SuperVOOC' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1592286927505-0aceb2d6f3e9?w=800',
        isThumbnail: true,
        alt: 'OnePlus 12',
      },
    ],
    variants: [
      { id: 'cel-005-green', name: 'Flowy Emerald', type: 'color', stockCount: 10 },
      { id: 'cel-005-black', name: 'Silky Black', type: 'color', stockCount: 14 },
    ],
  },
  {
    id: 'cel-006',
    name: 'iPhone 14',
    description:
      'iPhone con chip A15 Bionic, cámara dual de 12MP con modo Acción, pantalla Super Retina XDR de 6.1" y detección de choques.',
    categoryId: 'celulares',
    priceOriginal: 899990,
    priceDiscount: 749990,
    featured: false,
    specs: [
      { key: 'Pantalla', value: '6.1" Super Retina XDR' },
      { key: 'Procesador', value: 'A15 Bionic' },
      { key: 'RAM', value: '6GB' },
      { key: 'Almacenamiento', value: '128GB/256GB/512GB' },
      { key: 'Cámara', value: '12MP dual con modo Acción' },
      { key: 'Batería', value: 'Hasta 20 horas de video' },
      { key: 'Seguridad', value: 'Detección de choques y SOS' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1678652197950-91bbbb0d3980?w=800',
        isThumbnail: true,
        alt: 'iPhone 14',
      },
    ],
    variants: [
      { id: 'cel-006-blue', name: 'Azul - 128GB', type: 'color', stockCount: 18 },
      { id: 'cel-006-purple', name: 'Púrpura - 128GB', type: 'color', stockCount: 15 },
      { id: 'cel-006-midnight', name: 'Medianoche - 256GB', type: 'color', stockCount: 12 },
    ],
  },
  {
    id: 'cel-007',
    name: 'Samsung Galaxy Z Fold 5',
    description:
      'Smartphone plegable con pantalla Dynamic AMOLED 2X de 7.6" interior, procesador Snapdragon 8 Gen 2, S Pen compatible y diseño premium ultradelgado.',
    categoryId: 'celulares',
    priceOriginal: 1899990,
    priceDiscount: 1699990,
    featured: true,
    specs: [
      { key: 'Pantalla principal', value: '7.6" Dynamic AMOLED 2X plegable' },
      { key: 'Pantalla exterior', value: '6.2" AMOLED' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 2' },
      { key: 'RAM', value: '12GB' },
      { key: 'Cámara', value: '50MP triple + 10MP frontal doble' },
      { key: 'S Pen', value: 'Compatible (se vende por separado)' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800',
        isThumbnail: true,
        alt: 'Samsung Galaxy Z Fold 5',
      },
    ],
    variants: [
      { id: 'cel-007-phantom', name: 'Phantom Black - 512GB', type: 'color', stockCount: 5 },
      { id: 'cel-007-cream', name: 'Cream - 512GB', type: 'color', stockCount: 3 },
    ],
  },
  {
    id: 'cel-008',
    name: 'Motorola Edge 40 Pro',
    description:
      'Flagship de Motorola con Snapdragon 8 Gen 2, pantalla pOLED de 6.67" 165Hz, carga TurboPower de 125W y Android puro con Ready For.',
    categoryId: 'celulares',
    priceOriginal: 699990,
    priceDiscount: 599990,
    featured: false,
    specs: [
      { key: 'Pantalla', value: '6.67" pOLED 165Hz' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 2' },
      { key: 'RAM', value: '12GB' },
      { key: 'Almacenamiento', value: '256GB/512GB' },
      { key: 'Cámara', value: '50MP triple' },
      { key: 'Batería', value: '4600mAh' },
      { key: 'Carga', value: '125W TurboPower' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599950755346-a3e58f84ca63?w=800',
        isThumbnail: true,
        alt: 'Motorola Edge 40 Pro',
      },
    ],
    variants: [
      { id: 'cel-008-interstellar', name: 'Interstellar Black', type: 'color', stockCount: 9 },
      { id: 'cel-008-lunar', name: 'Lunar Blue', type: 'color', stockCount: 7 },
    ],
  },
  {
    id: 'cel-009',
    name: 'OPPO Find X6 Pro',
    description:
      'Smartphone premium con cámara Hasselblad de 50MP, procesador Snapdragon 8 Gen 2, pantalla AMOLED LTPO de 6.82" y carga SuperVOOC 100W.',
    categoryId: 'celulares',
    priceOriginal: 899990,
    priceDiscount: 799990,
    featured: false,
    specs: [
      { key: 'Pantalla', value: '6.82" AMOLED LTPO 120Hz' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 2' },
      { key: 'RAM', value: '16GB' },
      { key: 'Almacenamiento', value: '512GB' },
      { key: 'Cámara', value: '50MP Hasselblad triple' },
      { key: 'Batería', value: '5000mAh' },
      { key: 'Carga', value: '100W SuperVOOC + 50W inalámbrica' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800',
        isThumbnail: true,
        alt: 'OPPO Find X6 Pro',
      },
    ],
    variants: [
      { id: 'cel-009-gold', name: 'Desert Gold', type: 'color', stockCount: 6 },
      { id: 'cel-009-black', name: 'Space Black', type: 'color', stockCount: 8 },
    ],
  },
  {
    id: 'cel-010',
    name: 'Realme GT 5 Pro',
    description:
      'Alto rendimiento a precio competitivo con Snapdragon 8 Gen 3, pantalla AMOLED de 6.78" 144Hz, cámara Sony IMX 50MP y carga de 100W.',
    categoryId: 'celulares',
    priceOriginal: 599990,
    priceDiscount: 499990,
    featured: false,
    specs: [
      { key: 'Pantalla', value: '6.78" AMOLED 144Hz' },
      { key: 'Procesador', value: 'Snapdragon 8 Gen 3' },
      { key: 'RAM', value: '12GB' },
      { key: 'Almacenamiento', value: '256GB' },
      { key: 'Cámara', value: '50MP Sony IMX (triple)' },
      { key: 'Batería', value: '5400mAh' },
      { key: 'Carga', value: '100W SuperDart' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=800',
        isThumbnail: true,
        alt: 'Realme GT 5 Pro',
      },
    ],
    variants: [
      { id: 'cel-010-red', name: 'Mars Red', type: 'color', stockCount: 14 },
      { id: 'cel-010-silver', name: 'Moon Silver', type: 'color', stockCount: 11 },
    ],
  },

  // ========================================
  // COMPUTADORES (10 productos)
  // ========================================
  {
    id: 'comp-001',
    name: 'MacBook Pro 16" M3 Max',
    description:
      'La laptop más potente de Apple con chip M3 Max, pantalla Liquid Retina XDR de 16.2", hasta 128GB de RAM unificada y batería de hasta 22 horas. Ideal para profesionales creativos.',
    categoryId: 'computadores',
    priceOriginal: 3299990,
    priceDiscount: 3099990,
    featured: true,
    specs: [
      { key: 'Procesador', value: 'Apple M3 Max (16 núcleos CPU)' },
      { key: 'GPU', value: '40 núcleos' },
      { key: 'RAM', value: '48GB/96GB/128GB unificada' },
      { key: 'Almacenamiento', value: '1TB/2TB/4TB/8TB SSD' },
      { key: 'Pantalla', value: '16.2" Liquid Retina XDR (3456x2234)' },
      { key: 'Batería', value: 'Hasta 22 horas' },
      { key: 'Peso', value: '2.15 kg' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        isThumbnail: true,
        alt: 'MacBook Pro 16"',
      },
    ],
    variants: [
      { id: 'comp-001-gray-1tb', name: 'Gris Espacial - 1TB', type: 'color', stockCount: 8 },
      { id: 'comp-001-silver-2tb', name: 'Plata - 2TB', type: 'color', stockCount: 5 },
    ],
  },
  {
    id: 'comp-002',
    name: 'Dell XPS 15 9530',
    description:
      'Ultrabook premium con procesador Intel Core i9-13900H, GPU NVIDIA RTX 4070, pantalla OLED 3.5K táctil y diseño ultradelgado en aluminio mecanizado.',
    categoryId: 'computadores',
    priceOriginal: 2799990,
    priceDiscount: 2499990,
    featured: true,
    specs: [
      { key: 'Procesador', value: 'Intel Core i9-13900H (14 núcleos)' },
      { key: 'GPU', value: 'NVIDIA GeForce RTX 4070 8GB' },
      { key: 'RAM', value: '32GB DDR5' },
      { key: 'Almacenamiento', value: '1TB SSD NVMe' },
      { key: 'Pantalla', value: '15.6" OLED 3.5K táctil (3456x2160)' },
      { key: 'Sistema', value: 'Windows 11 Pro' },
      { key: 'Peso', value: '1.86 kg' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
        isThumbnail: true,
        alt: 'Dell XPS 15',
      },
    ],
    variants: [
      { id: 'comp-002-platinum', name: 'Platinum Silver', type: 'color', stockCount: 10 },
      { id: 'comp-002-graphite', name: 'Graphite', type: 'color', stockCount: 7 },
    ],
  },
  {
    id: 'comp-003',
    name: 'HP Pavilion 15-eg3000',
    description:
      'Laptop versátil con Intel Core i7-1355U, pantalla Full HD IPS de 15.6", 16GB RAM y 512GB SSD. Perfect para trabajo, estudio y entretenimiento.',
    categoryId: 'computadores',
    priceOriginal: 899990,
    priceDiscount: 749990,
    featured: false,
    specs: [
      { key: 'Procesador', value: 'Intel Core i7-1355U (10 núcleos)' },
      { key: 'GPU', value: 'Intel Iris Xe Graphics' },
      { key: 'RAM', value: '16GB DDR4' },
      { key: 'Almacenamiento', value: '512GB SSD NVMe' },
      { key: 'Pantalla', value: '15.6" Full HD IPS (1920x1080)' },
      { key: 'Batería', value: 'Hasta 8 horas' },
      { key: 'Peso', value: '1.75 kg' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        isThumbnail: true,
        alt: 'HP Pavilion 15',
      },
    ],
    variants: [
      { id: 'comp-003-silver', name: 'Natural Silver', type: 'color', stockCount: 15 },
      { id: 'comp-003-blue', name: 'Spruce Blue', type: 'color', stockCount: 12 },
    ],
  },
  {
    id: 'comp-004',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    description:
      'Ultrabook empresarial premium con Intel Core i7-1365U vPro, pantalla 2.8K OLED, construcción en fibra de carbono ultra ligera y certificación militar MIL-STD-810H.',
    categoryId: 'computadores',
    priceOriginal: 2499990,
    priceDiscount: 2199990,
    featured: false,
    specs: [
      { key: 'Procesador', value: 'Intel Core i7-1365U vPro' },
      { key: 'RAM', value: '16GB LPDDR5' },
      { key: 'Almacenamiento', value: '512GB SSD PCIe 4.0' },
      { key: 'Pantalla', value: '14" 2.8K OLED (2880x1800)' },
      { key: 'Peso', value: '1.12 kg' },
      { key: 'Batería', value: 'Hasta 13 horas' },
      { key: 'Certificación', value: 'MIL-STD-810H' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        isThumbnail: true,
        alt: 'Lenovo ThinkPad X1 Carbon',
      },
    ],
    variants: [{ id: 'comp-004-black', name: 'Deep Black', type: 'color', stockCount: 9 }],
  },
  {
    id: 'comp-005',
    name: 'ASUS ROG Strix G16 2024',
    description:
      'Laptop gaming de alto rendimiento con Intel Core i9-14900HX, NVIDIA RTX 4080, pantalla QHD+ 240Hz y sistema de refrigeración ROG Intelligent Cooling.',
    categoryId: 'computadores',
    priceOriginal: 3499990,
    priceDiscount: 3199990,
    featured: true,
    specs: [
      { key: 'Procesador', value: 'Intel Core i9-14900HX (24 núcleos)' },
      { key: 'GPU', value: 'NVIDIA RTX 4080 12GB' },
      { key: 'RAM', value: '32GB DDR5 5600MHz' },
      { key: 'Almacenamiento', value: '2TB SSD PCIe 4.0' },
      { key: 'Pantalla', value: '16" QHD+ 240Hz (2560x1600)' },
      { key: 'Refrigeración', value: 'ROG Intelligent Cooling' },
      { key: 'RGB', value: 'Aura Sync' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=800',
        isThumbnail: true,
        alt: 'ASUS ROG Strix G16',
      },
    ],
    variants: [
      { id: 'comp-005-eclipse', name: 'Eclipse Gray', type: 'color', stockCount: 6 },
      { id: 'comp-005-volt', name: 'Volt Green', type: 'color', stockCount: 4 },
    ],
  },
  {
    id: 'comp-006',
    name: 'Microsoft Surface Laptop 5',
    description:
      'Laptop elegante y ultraportátil con procesador Intel Core i7-1255U, pantalla PixelSense táctil de 13.5", diseño premium en aluminio y Windows 11.',
    categoryId: 'computadores',
    priceOriginal: 1799990,
    priceDiscount: 1599990,
    featured: false,
    specs: [
      { key: 'Procesador', value: 'Intel Core i7-1255U' },
      { key: 'RAM', value: '16GB LPDDR5x' },
      { key: 'Almacenamiento', value: '512GB SSD' },
      { key: 'Pantalla', value: '13.5" PixelSense táctil (2256x1504)' },
      { key: 'Batería', value: 'Hasta 18 horas' },
      { key: 'Peso', value: '1.27 kg' },
      { key: 'Sistema', value: 'Windows 11 Home' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800',
        isThumbnail: true,
        alt: 'Microsoft Surface Laptop 5',
      },
    ],
    variants: [
      { id: 'comp-006-platinum', name: 'Platinum', type: 'color', stockCount: 11 },
      { id: 'comp-006-sage', name: 'Sage', type: 'color', stockCount: 8 },
    ],
  },
  {
    id: 'comp-007',
    name: 'Acer Predator Helios 18',
    description:
      'Bestia gaming con pantalla mini-LED de 18" 250Hz, Intel Core i9-14900HX, RTX 4090 y sistema de refrigeración líquida AeroBlade 5G.',
    categoryId: 'computadores',
    priceOriginal: 4299990,
    priceDiscount: 3999990,
    featured: true,
    specs: [
      { key: 'Procesador', value: 'Intel Core i9-14900HX' },
      { key: 'GPU', value: 'NVIDIA RTX 4090 16GB' },
      { key: 'RAM', value: '64GB DDR5' },
      { key: 'Almacenamiento', value: '2TB SSD RAID 0' },
      { key: 'Pantalla', value: '18" Mini-LED WQXGA 250Hz' },
      { key: 'Refrigeración', value: 'AeroBlade 5G + líquida' },
      { key: 'Teclado', value: 'RGB mecánico' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?w=800',
        isThumbnail: true,
        alt: 'Acer Predator Helios 18',
      },
    ],
    variants: [{ id: 'comp-007-black', name: 'Abyssal Black', type: 'color', stockCount: 3 }],
  },
  {
    id: 'comp-008',
    name: 'Huawei MateBook X Pro 2024',
    description:
      'Ultrabook premium con procesador Intel Core Ultra 9, pantalla táctil OLED 3.1K de 14.2", diseño ultradelgado en metal y cámara retráctil.',
    categoryId: 'computadores',
    priceOriginal: 1999990,
    priceDiscount: 1799990,
    featured: false,
    specs: [
      { key: 'Procesador', value: 'Intel Core Ultra 9 185H' },
      { key: 'RAM', value: '32GB LPDDR5x' },
      { key: 'Almacenamiento', value: '1TB SSD NVMe' },
      { key: 'Pantalla', value: '14.2" OLED 3.1K táctil (3120x2080)' },
      { key: 'Batería', value: 'Hasta 12 horas' },
      { key: 'Peso', value: '1.26 kg' },
      { key: 'Grosor', value: '13.5 mm' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
        isThumbnail: true,
        alt: 'Huawei MateBook X Pro',
      },
    ],
    variants: [
      { id: 'comp-008-gray', name: 'Space Gray', type: 'color', stockCount: 7 },
      { id: 'comp-008-green', name: 'Emerald Green', type: 'color', stockCount: 5 },
    ],
  },
  {
    id: 'comp-009',
    name: 'MSI Creator Z16P',
    description:
      'Workstation portátil para creadores con Intel Core i9-13980HX, RTX 4070, pantalla Mini-LED QHD+ y certificación ISV para software profesional.',
    categoryId: 'computadores',
    priceOriginal: 3199990,
    priceDiscount: 2899990,
    featured: false,
    specs: [
      { key: 'Procesador', value: 'Intel Core i9-13980HX' },
      { key: 'GPU', value: 'NVIDIA RTX 4070 8GB' },
      { key: 'RAM', value: '64GB DDR5' },
      { key: 'Almacenamiento', value: '2TB SSD NVMe' },
      { key: 'Pantalla', value: '16" Mini-LED QHD+ 165Hz (2560x1600)' },
      { key: 'Color', value: '100% DCI-P3' },
      { key: 'Certificación', value: 'ISV' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800',
        isThumbnail: true,
        alt: 'MSI Creator Z16P',
      },
    ],
    variants: [{ id: 'comp-009-lunar', name: 'Lunar Gray', type: 'color', stockCount: 5 }],
  },
  {
    id: 'comp-010',
    name: 'LG Gram 17 2024',
    description:
      'Ultraligero de 17" más liviano del mundo (1.35kg) con Intel Core i7-1360P, pantalla WQXGA IPS, batería de 90Wh y construcción en aleación de magnesio.',
    categoryId: 'computadores',
    priceOriginal: 1899990,
    priceDiscount: 1699990,
    featured: false,
    specs: [
      { key: 'Procesador', value: 'Intel Core i7-1360P' },
      { key: 'RAM', value: '16GB LPDDR5' },
      { key: 'Almacenamiento', value: '1TB SSD NVMe' },
      { key: 'Pantalla', value: '17" WQXGA IPS (2560x1600)' },
      { key: 'Peso', value: '1.35 kg (¡increíble!)' },
      { key: 'Batería', value: '90Wh (hasta 19.5 horas)' },
      { key: 'Material', value: 'Aleación de magnesio' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602524206684-81a9b3a4e2fe?w=800',
        isThumbnail: true,
        alt: 'LG Gram 17',
      },
    ],
    variants: [
      { id: 'comp-010-silver', name: 'Snow White', type: 'color', stockCount: 8 },
      { id: 'comp-010-black', name: 'Obsidian Black', type: 'color', stockCount: 6 },
    ],
  },

  // ========================================
  // ACCESORIOS (10 productos)
  // ========================================
  {
    id: 'acc-001',
    name: 'AirPods Pro 2da Gen con USB-C',
    description:
      'Auriculares inalámbricos premium de Apple con cancelación activa de ruido adaptativa, audio espacial personalizado, modo ambiente y estuche MagSafe con USB-C.',
    categoryId: 'accesorios',
    priceOriginal: 279990,
    priceDiscount: 249990,
    featured: true,
    specs: [
      { key: 'Cancelación de ruido', value: 'Activa adaptativa con chip H2' },
      { key: 'Audio', value: 'Espacial personalizado con seguimiento dinámico' },
      { key: 'Batería', value: 'Hasta 6h (30h con estuche)' },
      { key: 'Resistencia', value: 'IPX4 (resistente al agua)' },
      { key: 'Conectividad', value: 'Bluetooth 5.3' },
      { key: 'Estuche', value: 'MagSafe con USB-C y altavoz' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
        isThumbnail: true,
        alt: 'AirPods Pro 2',
      },
    ],
    variants: [{ id: 'acc-001-white', name: 'Blanco', type: 'color', stockCount: 25 }],
  },
  {
    id: 'acc-002',
    name: 'Sony WH-1000XM5',
    description:
      'Auriculares over-ear con la mejor cancelación de ruido del mercado, 8 micrófonos, batería de 30 horas, audio Hi-Res y diseño premium ultraligero.',
    categoryId: 'accesorios',
    priceOriginal: 399990,
    priceDiscount: 349990,
    featured: true,
    specs: [
      { key: 'Cancelación de ruido', value: 'Líder de la industria (8 micrófonos)' },
      { key: 'Batería', value: 'Hasta 30 horas' },
      { key: 'Carga rápida', value: '3 min = 3 horas' },
      { key: 'Audio', value: 'Hi-Res, LDAC, DSEE Extreme' },
      { key: 'Conectividad', value: 'Bluetooth 5.2, NFC, multipunto' },
      { key: 'Peso', value: '250g' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
        isThumbnail: true,
        alt: 'Sony WH-1000XM5',
      },
    ],
    variants: [
      { id: 'acc-002-black', name: 'Negro', type: 'color', stockCount: 18 },
      { id: 'acc-002-silver', name: 'Plata', type: 'color', stockCount: 14 },
    ],
  },
  {
    id: 'acc-003',
    name: 'Logitech MX Master 3S',
    description:
      'Mouse ergonómico premium con sensor de 8000 DPI, desplazamiento electromagnético MagSpeed, 8 botones programables y hasta 70 días de batería.',
    categoryId: 'accesorios',
    priceOriginal: 119990,
    priceDiscount: 99990,
    featured: false,
    specs: [
      { key: 'Sensor', value: '8000 DPI de precisión' },
      { key: 'Desplazamiento', value: 'MagSpeed electromagnético' },
      { key: 'Botones', value: '8 programables' },
      { key: 'Batería', value: 'Hasta 70 días (USB-C recargable)' },
      { key: 'Conectividad', value: 'Bluetooth + USB receptor' },
      { key: 'Compatibilidad', value: 'Flow multi-dispositivo' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
        isThumbnail: true,
        alt: 'Logitech MX Master 3S',
      },
    ],
    variants: [
      { id: 'acc-003-graphite', name: 'Graphite', type: 'color', stockCount: 20 },
      { id: 'acc-003-pale', name: 'Pale Gray', type: 'color', stockCount: 15 },
    ],
  },
  {
    id: 'acc-004',
    name: 'Keychron K8 Pro Mechanical',
    description:
      'Teclado mecánico inalámbrico TKL con switches Gateron Pro, hot-swappable, iluminación RGB, batería de 4000mAh y compatibilidad Mac/Windows.',
    categoryId: 'accesorios',
    priceOriginal: 149990,
    priceDiscount: 129990,
    featured: true,
    specs: [
      { key: 'Layout', value: 'TKL (87 teclas)' },
      { key: 'Switches', value: 'Gateron Pro (Red/Brown/Blue) hot-swap' },
      { key: 'Conectividad', value: 'Bluetooth 5.1 + USB-C cable' },
      { key: 'Batería', value: '4000mAh (hasta 240 horas)' },
      { key: 'Iluminación', value: 'RGB por tecla programable' },
      { key: 'Compatibilidad', value: 'Mac/Windows/Linux' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
        isThumbnail: true,
        alt: 'Keychron K8 Pro',
      },
    ],
    variants: [
      { id: 'acc-004-red', name: 'Gateron Red (Lineal)', type: 'style', stockCount: 12 },
      { id: 'acc-004-brown', name: 'Gateron Brown (Táctil)', type: 'style', stockCount: 15 },
      { id: 'acc-004-blue', name: 'Gateron Blue (Clicky)', type: 'style', stockCount: 8 },
    ],
  },
  {
    id: 'acc-005',
    name: 'Anker 747 GaNPrime 150W',
    description:
      'Cargador de pared con tecnología GaN de 4 puertos (3 USB-C + 1 USB-A), carga rápida de 150W total, compatible con MacBook Pro, laptops, tablets y smartphones.',
    categoryId: 'accesorios',
    priceOriginal: 129990,
    priceDiscount: 109990,
    featured: false,
    specs: [
      { key: 'Potencia total', value: '150W' },
      { key: 'Puertos', value: '3x USB-C (100W/100W/45W) + 1x USB-A (22.5W)' },
      { key: 'Tecnología', value: 'GaN (Nitruro de Galio)' },
      { key: 'Protecciones', value: 'ActiveShield 2.0' },
      { key: 'Compatibilidad', value: 'MacBook, Dell, HP, iPad, iPhone, Samsung' },
      { key: 'Tamaño', value: '40% más pequeño que cargadores tradicionales' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1591290619762-c588f8e8da49?w=800',
        isThumbnail: true,
        alt: 'Anker 747 GaNPrime',
      },
    ],
    variants: [{ id: 'acc-005-black', name: 'Negro', type: 'color', stockCount: 22 }],
  },
  {
    id: 'acc-006',
    name: 'Samsung T7 Shield SSD 2TB',
    description:
      'SSD portátil de alta velocidad resistente al agua (IP65), golpes y polvo. Velocidades de hasta 1050 MB/s con USB 3.2 Gen 2 y cifrado AES 256-bit.',
    categoryId: 'accesorios',
    priceOriginal: 299990,
    priceDiscount: 259990,
    featured: false,
    specs: [
      { key: 'Capacidad', value: '2TB' },
      { key: 'Velocidad lectura', value: 'Hasta 1050 MB/s' },
      { key: 'Velocidad escritura', value: 'Hasta 1000 MB/s' },
      { key: 'Conectividad', value: 'USB 3.2 Gen 2 (USB-C)' },
      { key: 'Resistencia', value: 'IP65 (agua y polvo), caídas 3m' },
      { key: 'Seguridad', value: 'Cifrado AES 256-bit' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=800',
        isThumbnail: true,
        alt: 'Samsung T7 Shield',
      },
    ],
    variants: [
      { id: 'acc-006-black', name: 'Negro - 2TB', type: 'color', stockCount: 16 },
      { id: 'acc-006-blue', name: 'Azul - 2TB', type: 'color', stockCount: 10 },
    ],
  },
  {
    id: 'acc-007',
    name: 'Razer DeathAdder V3 Pro',
    description:
      'Mouse gaming inalámbrico profesional con sensor Focus Pro 30K, switches ópticas Gen-3, 90 horas de batería y peso ultraligero de 63g.',
    categoryId: 'accesorios',
    priceOriginal: 159990,
    priceDiscount: 139990,
    featured: true,
    specs: [
      { key: 'Sensor', value: 'Focus Pro 30K DPI' },
      { key: 'Switches', value: 'Ópticas Gen-3 (90M clicks)' },
      { key: 'Batería', value: 'Hasta 90 horas' },
      { key: 'Peso', value: '63g (ultraligero)' },
      { key: 'Conectividad', value: 'HyperSpeed Wireless + Bluetooth + cable' },
      { key: 'Polling rate', value: '1000Hz / 4000Hz con dongle' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586920740099-670d3c0672e9?w=800',
        isThumbnail: true,
        alt: 'Razer DeathAdder V3 Pro',
      },
    ],
    variants: [
      { id: 'acc-007-black', name: 'Negro', type: 'color', stockCount: 14 },
      { id: 'acc-007-white', name: 'Blanco', type: 'color', stockCount: 9 },
    ],
  },
  {
    id: 'acc-008',
    name: 'Elgato Stream Deck MK.2',
    description:
      'Controlador de contenido con 15 teclas LCD personalizables, control de streaming, edición de video, smart home y productividad. Compatible con OBS, Twitch, YouTube.',
    categoryId: 'accesorios',
    priceOriginal: 179990,
    priceDiscount: 159990,
    featured: false,
    specs: [
      { key: 'Teclas', value: '15 LCD personalizables' },
      { key: 'Resolución', value: '72x72 px por tecla' },
      { key: 'Compatibilidad', value: 'OBS, Twitch, YouTube, Adobe, Spotify, Philips Hue' },
      { key: 'Conectividad', value: 'USB-C desmontable' },
      { key: 'Soporte', value: 'Ajustable (magnético)' },
      { key: 'Plugins', value: 'Más de 500 disponibles' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800',
        isThumbnail: true,
        alt: 'Elgato Stream Deck',
      },
    ],
    variants: [{ id: 'acc-008-black', name: 'Negro', type: 'color', stockCount: 11 }],
  },
  {
    id: 'acc-009',
    name: 'Belkin BoostCharge Pro 3-in-1 MagSafe',
    description:
      'Base de carga inalámbrica 3 en 1 con soporte MagSafe para iPhone (15W), Apple Watch y AirPods. Diseño premium en aluminio y certificación Qi2.',
    categoryId: 'accesorios',
    priceOriginal: 169990,
    priceDiscount: 149990,
    featured: false,
    specs: [
      { key: 'Carga iPhone', value: 'MagSafe 15W' },
      { key: 'Carga Watch', value: 'Carga rápida certificada' },
      { key: 'Carga AirPods', value: '5W Qi' },
      { key: 'Material', value: 'Aluminio premium' },
      { key: 'Certificaciones', value: 'Qi2, MFi (Made for iPhone)' },
      { key: 'Cable', value: 'USB-C de 2m incluido' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601972599720-7cb2b2e9d382?w=800',
        isThumbnail: true,
        alt: 'Belkin 3-in-1 MagSafe',
      },
    ],
    variants: [
      { id: 'acc-009-white', name: 'Blanco', type: 'color', stockCount: 13 },
      { id: 'acc-009-black', name: 'Negro', type: 'color', stockCount: 10 },
    ],
  },
  {
    id: 'acc-010',
    name: 'Webcam Logitech Brio 4K Pro',
    description:
      'Webcam profesional 4K Ultra HD con HDR, RightLight 3, autofocus, 5x zoom digital, micrófono dual con reducción de ruido y certificación Windows Hello.',
    categoryId: 'accesorios',
    priceOriginal: 229990,
    priceDiscount: 199990,
    featured: false,
    specs: [
      { key: 'Resolución', value: '4K Ultra HD (4096x2160) a 30fps' },
      { key: 'Campo de visión', value: '65°/78°/90° ajustable' },
      { key: 'HDR', value: 'Sí, con RightLight 3' },
      { key: 'Autofocus', value: 'Ultra rápido' },
      { key: 'Zoom', value: '5x digital' },
      { key: 'Micrófono', value: 'Dual omnidireccional con reducción de ruido' },
      { key: 'Seguridad', value: 'Windows Hello IR facial recognition' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800',
        isThumbnail: true,
        alt: 'Logitech Brio 4K',
      },
    ],
    variants: [{ id: 'acc-010-black', name: 'Negro', type: 'color', stockCount: 17 }],
  },

  // ========================================
  // ELECTRODOMÉSTICOS (10 productos)
  // ========================================
  {
    id: 'elec-001',
    name: 'Samsung Family Hub French Door 28 cu.ft',
    description:
      'Refrigerador inteligente de 28 pies cúbicos con pantalla táctil Family Hub de 21.5", cámaras internas, dispensador dual de agua y hielo, tecnología Twin Cooling Plus.',
    categoryId: 'electrodomesticos',
    priceOriginal: 5999990,
    priceDiscount: 5499990,
    featured: true,
    specs: [
      { key: 'Capacidad', value: '28 pies cúbicos (794 litros)' },
      { key: 'Pantalla', value: 'Family Hub 21.5" táctil' },
      { key: 'Cámaras', value: '3 internas para ver contenido desde smartphone' },
      { key: 'Tecnología', value: 'Twin Cooling Plus' },
      { key: 'Dispensador', value: 'Agua filtrada + Hielo dual (cubos y picado)' },
      { key: 'Conectividad', value: 'WiFi, SmartThings, Alexa, Bixby' },
      { key: 'Eficiencia', value: 'Energy Star certificado' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800',
        isThumbnail: true,
        alt: 'Samsung Family Hub',
      },
    ],
    variants: [
      { id: 'elec-001-stainless', name: 'Acero Inoxidable', type: 'material', stockCount: 6 },
      { id: 'elec-001-black', name: 'Black Stainless Steel', type: 'material', stockCount: 4 },
    ],
  },
  {
    id: 'elec-002',
    name: 'LG WashTower All-in-One 5.0/7.4 cu.ft',
    description:
      'Torre de lavado todo-en-uno con lavadora de carga frontal 5.0 cu.ft y secadora de 7.4 cu.ft, tecnología AI DD, TurboWash 360, Steam y conectividad ThinQ.',
    categoryId: 'electrodomesticos',
    priceOriginal: 3999990,
    priceDiscount: 3599990,
    featured: true,
    specs: [
      { key: 'Lavadora', value: '5.0 cu.ft carga frontal' },
      { key: 'Secadora', value: '7.4 cu.ft con bomba de calor' },
      { key: 'Tecnología lavado', value: 'AI DD + TurboWash 360 (30 min)' },
      { key: 'Steam', value: 'Vapor en lavado y secado' },
      { key: 'Panel', value: 'Control táctil central LCD' },
      { key: 'Conectividad', value: 'WiFi ThinQ con IA' },
      { key: 'Eficiencia', value: 'Energy Star Most Efficient' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1626806787461-102c1d2c5db5?w=800',
        isThumbnail: true,
        alt: 'LG WashTower',
      },
    ],
    variants: [
      { id: 'elec-002-graphite', name: 'Graphite Steel', type: 'color', stockCount: 5 },
      { id: 'elec-002-white', name: 'Blanco', type: 'color', stockCount: 7 },
    ],
  },
  {
    id: 'elec-003',
    name: 'Dyson V15 Detect Absolute',
    description:
      'Aspiradora inalámbrica premium con láser que revela polvo microscópico, sensor piezo que cuenta y mide partículas, pantalla LCD y hasta 60 min de autonomía.',
    categoryId: 'electrodomesticos',
    priceOriginal: 899990,
    priceDiscount: 799990,
    featured: true,
    specs: [
      { key: 'Motor', value: 'Hyperdymium 230 AW (125,000 rpm)' },
      { key: 'Tecnología', value: 'Laser Detect + sensor piezo' },
      { key: 'Pantalla', value: 'LCD muestra partículas en tiempo real' },
      { key: 'Autonomía', value: 'Hasta 60 minutos (modo Eco)' },
      { key: 'Filtración', value: '99.99% de partículas de 0.3 micrones' },
      { key: 'Accesorios', value: '8 herramientas incluidas' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800',
        isThumbnail: true,
        alt: 'Dyson V15 Detect',
      },
    ],
    variants: [{ id: 'elec-003-yellow', name: 'Amarillo/Nickel', type: 'color', stockCount: 12 }],
  },
  {
    id: 'elec-004',
    name: 'Ninja Foodi 14-in-1 SmartLid',
    description:
      'Multi-cooker 14 en 1 con SmartLid que cambia automáticamente entre modos: olla de presión, freidora de aire, slow cooker, deshidratador, yogurtera y más.',
    categoryId: 'electrodomesticos',
    priceOriginal: 449990,
    priceDiscount: 399990,
    featured: false,
    specs: [
      { key: 'Capacidad', value: '6.5 litros' },
      { key: 'Funciones', value: '14 en 1 (presión, aire, vapor, asar, hornear, etc)' },
      { key: 'SmartLid', value: 'Tapa inteligente que cambia de modo' },
      { key: 'Temperatura', value: 'Hasta 240°C (freidora de aire)' },
      { key: 'Panel', value: 'Digital táctil' },
      { key: 'Accesorios', value: 'Cesta crisper, rack reversible, termómetro' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585237672455-149bc5510779?w=800',
        isThumbnail: true,
        alt: 'Ninja Foodi SmartLid',
      },
    ],
    variants: [{ id: 'elec-004-black', name: 'Negro', type: 'color', stockCount: 15 }],
  },
  {
    id: 'elec-005',
    name: 'Breville Barista Touch Impress',
    description:
      'Máquina de espresso automática con molinillo integrado, asistencia de prensado automático, control de temperatura PID, vaporizador automático y pantalla táctil.',
    categoryId: 'electrodomesticos',
    priceOriginal: 1799990,
    priceDiscount: 1599990,
    featured: true,
    specs: [
      { key: 'Presión', value: '15 bares con bomba italiana' },
      { key: 'Molinillo', value: 'Integrado de acero inoxidable (30 niveles)' },
      { key: 'Auto-prensado', value: 'Asistencia inteligente de tamping' },
      { key: 'Control temp', value: 'PID digital de precisión' },
      { key: 'Vaporizador', value: 'Automático para microespuma perfecta' },
      { key: 'Pantalla', value: 'Táctil a color con recetas' },
      { key: 'Capacidad agua', value: '2 litros' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
        isThumbnail: true,
        alt: 'Breville Barista Touch',
      },
    ],
    variants: [
      { id: 'elec-005-stainless', name: 'Acero Inoxidable', type: 'material', stockCount: 8 },
      { id: 'elec-005-black', name: 'Black Truffle', type: 'material', stockCount: 6 },
    ],
  },
  {
    id: 'elec-006',
    name: 'Whirlpool Smart Dishwasher',
    description:
      'Lavavajillas inteligente de 15 cubiertos con sensor de suciedad, ciclo de 1 hora, brazo rociador PowerDry, tercera canasta superior y conectividad WiFi.',
    categoryId: 'electrodomesticos',
    priceOriginal: 1299990,
    priceDiscount: 1149990,
    featured: false,
    specs: [
      { key: 'Capacidad', value: '15 cubiertos' },
      { key: 'Canastas', value: '3 niveles (incluye canasta superior ajustable)' },
      { key: 'Sensor', value: 'Detección automática de suciedad' },
      { key: 'Ciclos', value: '6 programas + ciclo rápido de 1 hora' },
      { key: 'Ruido', value: '45 dB (ultra silencioso)' },
      { key: 'Conectividad', value: 'WiFi, control desde app' },
      { key: 'Eficiencia', value: 'Energy Star' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800',
        isThumbnail: true,
        alt: 'Whirlpool Smart Dishwasher',
      },
    ],
    variants: [
      { id: 'elec-006-stainless', name: 'Acero Inoxidable', type: 'material', stockCount: 10 },
      { id: 'elec-006-black', name: 'Negro', type: 'material', stockCount: 7 },
    ],
  },
  {
    id: 'elec-007',
    name: 'Daikin Inverter Mini-Split 24000 BTU',
    description:
      'Aire acondicionado inverter con calefacción, tecnología Flash Streamer para purificación, control inteligente, WiFi integrado y eficiencia SEER 21.',
    categoryId: 'electrodomesticos',
    priceOriginal: 1899990,
    priceDiscount: 1699990,
    featured: true,
    specs: [
      { key: 'Capacidad', value: '24,000 BTU' },
      { key: 'Tipo', value: 'Inverter frío/calor' },
      { key: 'SEER', value: '21 (alta eficiencia)' },
      { key: 'Tecnología', value: 'Flash Streamer (purificación activa)' },
      { key: 'Ruido', value: '19 dB (modo silencioso)' },
      { key: 'Cobertura', value: 'Hasta 40 m²' },
      { key: 'Control', value: 'WiFi + app + control remoto' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1631545804457-2430edd9ff40?w=800',
        isThumbnail: true,
        alt: 'Daikin Mini-Split',
      },
    ],
    variants: [{ id: 'elec-007-white', name: 'Blanco', type: 'color', stockCount: 9 }],
  },
  {
    id: 'elec-008',
    name: 'iRobot Roomba j7+ Combo',
    description:
      'Robot aspirador y trapeador 2 en 1 con IA PrecisionVision para evitar obstáculos, base de autovaciado Clean Base, mapeo inteligente Imprint y control por voz.',
    categoryId: 'electrodomesticos',
    priceOriginal: 1299990,
    priceDiscount: 1149990,
    featured: true,
    specs: [
      { key: 'Funciones', value: 'Aspirar + trapear 2 en 1' },
      { key: 'IA', value: 'PrecisionVision evita cables y objetos' },
      { key: 'Base', value: 'Autovaciado Clean Base (60 días)' },
      { key: 'Mapeo', value: 'Imprint Smart Mapping con zonas personalizadas' },
      { key: 'Potencia', value: 'Succión 10x en alfombras' },
      { key: 'Control', value: 'App iRobot, Alexa, Google, Siri' },
      { key: 'Batería', value: 'Hasta 120 minutos' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800',
        isThumbnail: true,
        alt: 'iRobot Roomba j7+',
      },
    ],
    variants: [{ id: 'elec-008-graphite', name: 'Graphite', type: 'color', stockCount: 11 }],
  },
  {
    id: 'elec-009',
    name: 'Vitamix A3500 Ascent',
    description:
      'Licuadora profesional de alto rendimiento con 5 programas automáticos, pantalla táctil, motor de 2.2 HP, contenedor autodetectable y conectividad con app.',
    categoryId: 'electrodomesticos',
    priceOriginal: 899990,
    priceDiscount: 799990,
    featured: false,
    specs: [
      { key: 'Motor', value: '2.2 HP (peak 12 amp)' },
      { key: 'Velocidades', value: 'Variable + Pulse' },
      { key: 'Programas', value: '5 automáticos (smoothie, sopa caliente, dip, etc)' },
      { key: 'Pantalla', value: 'Táctil digital' },
      { key: 'Contenedor', value: '2 litros autodetectable' },
      { key: 'Timer', value: 'Digital integrado' },
      { key: 'Garantía', value: '10 años' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800',
        isThumbnail: true,
        alt: 'Vitamix A3500',
      },
    ],
    variants: [
      { id: 'elec-009-black', name: 'Negro', type: 'color', stockCount: 10 },
      { id: 'elec-009-red', name: 'Rojo', type: 'color', stockCount: 6 },
      { id: 'elec-009-white', name: 'Blanco', type: 'color', stockCount: 8 },
    ],
  },
  {
    id: 'elec-010',
    name: 'Philips Hue White & Color Starter Kit',
    description:
      'Kit de iluminación inteligente con 4 focos LED E27 16M de colores, puente Hue Bridge, control por app/voz, sincronización con música y entretenimiento.',
    categoryId: 'electrodomesticos',
    priceOriginal: 299990,
    priceDiscount: 259990,
    featured: false,
    specs: [
      { key: 'Focos', value: '4x E27 White & Color (16 millones de colores)' },
      { key: 'Brillo', value: '1100 lúmenes por foco' },
      { key: 'Bridge', value: 'Incluido (hasta 50 luces)' },
      { key: 'Control', value: 'App Hue, Alexa, Google, HomeKit, SmartThings' },
      { key: 'Sincronización', value: 'Música, TV, juegos (con Sync Box)' },
      { key: 'Vida útil', value: '25,000 horas' },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        isThumbnail: true,
        alt: 'Philips Hue Starter Kit',
      },
    ],
    variants: [{ id: 'elec-010-kit', name: 'Kit 4 Focos + Bridge', type: 'style', stockCount: 18 }],
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
