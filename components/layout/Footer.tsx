/**
 * Footer Component
 *
 * Global footer with AVA branding and information
 */

'use client';

import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/icon.png"
              alt="AVA Tecnología"
              width={140}
              height={56}
              className="h-14 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-neutral-400 text-sm mb-4">
              Tu tienda de tecnología de confianza. Venta a crédito y contado de computadores,
              televisores, celulares e impresoras.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/ava_tecnologia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 hover:bg-brand-500 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-neutral-800 hover:bg-brand-500 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categorías</h3>
            <ul className="space-y-2">
              {['Celulares', 'Computadores', 'Tablets', 'Televisores', 'Accesorios'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/search?category=${cat.toLowerCase()}`}
                    className="text-neutral-400 hover:text-brand-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-brand-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-neutral-400">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-sm">Santa Rosa de C. Cll 14 # 13-27</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="text-sm">WhatsApp disponible</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="text-sm">info@avatecnologia.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {currentYear} AVA Tecnología. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-neutral-500">
              <Link href="#" className="hover:text-brand-400 transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="#" className="hover:text-brand-400 transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
