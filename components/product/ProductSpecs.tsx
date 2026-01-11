/**
 * Product Specifications Component
 *
 * Displays product technical specifications in a table format
 */

'use client';

import { ProductSpec } from '@/lib/types';

interface ProductSpecsProps {
  specs: ProductSpec[];
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-neutral-800 mb-4">Especificaciones Técnicas</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={spec.key}
                className={`border-b ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}`}
              >
                <td className="py-3 px-4 font-semibold text-neutral-700 w-1/3">{spec.key}</td>
                <td className="py-3 px-4 text-neutral-600">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
