/**
 * Header Component
 *
 * Main navigation bar with AVA logo, search, and cart
 */

'use client';

import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ds/atomic/Badge';
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

  const categories = [
    { name: 'Celulares', href: '/search?category=celulares' },
    { name: 'Computadores', href: '/search?category=computadores' },
    { name: 'Tablets', href: '/search?category=tablets' },
    { name: 'Televisores', href: '/search?category=televisores' },
    { name: 'Accesorios', href: '/search?category=accesorios' },
  ];

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-neutral-200">
      {/* Top Bar */}
      <div className="bg-neutral-900 text-white py-2 text-center text-sm font-medium">
        <p>🚚 Envío gratis en compras mayores a $200.000 | 📍 Santa Rosa de C. Cll 14 # 13-27</p>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/icon.png"
              alt="AVA Tecnología"
              width={120}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Search Bar - BR. Style */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition-all"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search */}
            <button
              className="md:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
              onClick={() => router.push('/search')}
              aria-label="Buscar"
            >
              <Search className="w-6 h-6 text-neutral-700" />
            </button>

            {/* Favorites */}
            <button
              className="hidden sm:flex p-2 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Favoritos"
            >
              <Heart className="w-6 h-6 text-neutral-700" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-neutral-700" />
              {totalItems > 0 && (
                <Badge
                  variant="error"
                  size="sm"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* User */}
            <button
              className="hidden sm:flex p-2 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Mi cuenta"
            >
              <User className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none transition-all"
            />
          </div>
        </form>
      </div>

      {/* Categories Navigation */}
      <nav className="border-t border-neutral-100 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="inline-block py-3 text-sm font-medium text-neutral-700 hover:text-brand-500 border-b-2 border-transparent hover:border-brand-500 transition-all"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
