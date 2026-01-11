/**
 * Image Gallery Component
 *
 * Displays product images with thumbnail navigation
 * Used in product detail page
 *
 * Future: Images will be loaded from S3 with signed URLs
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ProductImage } from '@/lib/types';

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images) {
    return (
      <div className="w-full h-96 bg-neutral-200 flex items-center justify-center rounded-lg">
        <p className="text-neutral-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-96 md:h-[500px] bg-neutral-100 rounded-lg overflow-hidden">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt ?? `${productName} - Imagen ${selectedImageIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedImageIndex === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-brand-600 ring-2 ring-brand-300'
                  : 'border-neutral-300 hover:border-neutral-400'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt ?? `${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-neutral-600">
        Imagen {selectedImageIndex + 1} de {images.length}
      </div>
    </div>
  );
}
