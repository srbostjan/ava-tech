/**
 * Mock Categories Data - AVA Tecnología
 *
 * In production, this data will come from DynamoDB via AppSync GraphQL API
 * Structure simulates what would be returned from:
 *   query ListCategories { listCategories { items { id name description imageUrl } } }
 */

import { Category } from '@/lib/types';

export const mockCategories: Category[] = [
  {
    id: 'celulares',
    name: 'Celulares',
    description: 'Smartphones y teléfonos móviles de última generación',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    order: 1,
    isActive: true,
  },
  {
    id: 'computadores',
    name: 'Computadores',
    description: 'Laptops, PCs de escritorio y equipos portátiles',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    order: 2,
    isActive: true,
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Audífonos, cargadores, mouse, teclados y más',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    order: 3,
    isActive: true,
  },
  {
    id: 'electrodomesticos',
    name: 'Electrodomésticos',
    description: 'Neveras, lavadoras, aires acondicionados y más',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
    order: 4,
    isActive: true,
  },
];

// Helper function to get category by ID (simulates GraphQL getCategory query)
export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find((cat) => cat.id === id);
};

// Helper function to get category name by ID
export const getCategoryName = (id: string): string => {
  const category = getCategoryById(id);
  return category ? category.name : 'Sin categoría';
};
