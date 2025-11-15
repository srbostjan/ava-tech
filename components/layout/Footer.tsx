/**
 * Footer Component
 *
 * Global footer with links and information
 */

'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">E-Commerce</h3>
            <p className="text-gray-400 text-sm">
              Tu tienda en línea de confianza para productos de calidad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Buscar Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p className="text-gray-400 text-sm">
              ¿Tienes preguntas? Contáctanos por WhatsApp.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} E-Commerce. Todos los derechos reservados.</p>
          <p className="mt-2">
            Desarrollado con Next.js y preparado para AWS Amplify
          </p>
        </div>
      </div>
    </footer>
  );
}
