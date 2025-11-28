/**
 * Header Component
 *
 * Main navigation bar with logo, search, and cart
 */

'use client';

import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ds/atomic/Badge';
import { Button } from '@/components/ds/atomic/Button';
import { useCartStore } from '@/lib/store/cartStore';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((state) => state.totalItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-accent-500 hover:text-accent-600 transition-colors">
              E-Commerce
            </h1>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-md border-2 border-neutral-100 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-500 hover:bg-accent-600 text-white p-2 rounded-md transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Cart Button */}
          <Link href="/cart" className="relative">
            <Button variant="primary" size="md" icon={<ShoppingCart className="w-5 h-5" />}>
              Carrito
            </Button>
            {totalItems > 0 && (
              <Badge
                variant="error"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0"
              >
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
