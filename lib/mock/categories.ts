/**
 * Mock Categories Data
 *
 * In production, this data will come from DynamoDB via AppSync GraphQL API
 * Structure simulates what would be returned from:
 *   query ListCategories { listCategories { items { id name description imageUrl } } }
 */

import { Category } from '@/lib/types';

export const mockCategories: Category[] = [
  {
    id: 'cat-001',
    name: 'Electrónica',
    description: 'Dispositivos electrónicos y gadgets',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
  },
  {
    id: 'cat-002',
    name: 'Ropa y Moda',
    description: 'Vestimenta y accesorios de moda',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500',
  },
  {
    id: 'cat-003',
    name: 'Hogar y Cocina',
    description: 'Artículos para el hogar y la cocina',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
  },
  {
    id: 'cat-004',
    name: 'Deportes',
    description: 'Equipamiento deportivo y fitness',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500',
  },
  {
    id: 'cat-005',
    name: 'Libros',
    description: 'Libros y material de lectura',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500',
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
