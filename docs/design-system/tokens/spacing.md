# Espaciado - Design Tokens

Sistema de espaciado basado en grid de **8px** para consistencia y armonía visual.

---

## Sistema de Grid: 8px

El espaciado está basado en múltiplos de 8px, lo que crea una coherencia visual y facilita el diseño responsive.

```
4px → 8px → 16px → 24px → 32px → 48px → 64px → 96px → 128px
```

---

## Tokens de Espaciado

```typescript
export const spacing = {
  0: '0px',
  1: '4px',    // 0.5 × 8px
  2: '8px',    // 1 × 8px
  3: '12px',   // 1.5 × 8px
  4: '16px',   // 2 × 8px
  5: '20px',   // 2.5 × 8px
  6: '24px',   // 3 × 8px
  8: '32px',   // 4 × 8px
  10: '40px',  // 5 × 8px
  12: '48px',  // 6 × 8px
  16: '64px',  // 8 × 8px
  20: '80px',  // 10 × 8px
  24: '96px',  // 12 × 8px
  32: '128px', // 16 × 8px
} as const;

// Alias semánticos
export const spacingAliases = {
  xs: spacing[1],    // 4px
  sm: spacing[2],    // 8px
  md: spacing[4],    // 16px
  lg: spacing[6],    // 24px
  xl: spacing[8],    // 32px
  '2xl': spacing[12], // 48px
  '3xl': spacing[16], // 64px
  '4xl': spacing[24], // 96px
  '5xl': spacing[32], // 128px
} as const;
```

---

## Uso por Componente

### Padding

| Componente | Padding | Valor | Uso |
|------------|---------|-------|-----|
| **Button SM** | `py-2 px-4` | 8px 16px | Botones pequeños |
| **Button MD** | `py-3 px-6` | 12px 24px | Botones estándar |
| **Button LG** | `py-4 px-8` | 16px 32px | Botones grandes |
| **Input** | `py-3 px-4` | 12px 16px | Campos de formulario |
| **Card** | `p-6` | 24px | Cards de producto |
| **Card Large** | `p-8` | 32px | Modales, cards destacadas |
| **Container** | `px-4 md:px-8` | 16px / 32px | Márgenes de contenedor |

### Margin / Gap

| Componente | Spacing | Valor | Uso |
|------------|---------|-------|-----|
| **Stack Tight** | `gap-2` | 8px | Labels con input |
| **Stack Normal** | `gap-4` | 16px | Formularios, listas |
| **Stack Loose** | `gap-6` | 24px | Secciones de contenido |
| **Section** | `my-12` | 48px | Entre secciones de página |
| **Hero** | `py-20` | 80px | Hero sections |

---

## Layout Spacing

### Container Padding

```css
.container {
  padding-left: 16px;  /* Mobile */
  padding-right: 16px;
}

@media (min-width: 768px) {
  .container {
    padding-left: 32px;  /* Tablet+ */
    padding-right: 32px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 48px;  /* Desktop */
    padding-right: 48px;
  }
}
```

### Section Spacing

```tsx
// Spacing entre secciones principales
<section className="py-12 md:py-16 lg:py-20">
  {/* 48px / 64px / 80px */}
</section>

// Spacing dentro de secciones
<div className="space-y-6 md:space-y-8">
  {/* 24px / 32px */}
</div>
```

---

## Grid Spacing

### Product Grid

```tsx
// Grid con gap consistente
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {/* 16px / 24px entre productos */}
</div>
```

### Form Grid

```tsx
// Formulario con spacing vertical
<form className="space-y-6">
  {/* 24px entre campos */}
  <div className="space-y-2">
    {/* 8px entre label e input */}
    <label>Email</label>
    <input />
  </div>
</form>
```

---

## Tailwind Classes

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
    },
  },
};
```

---

## Componentes Comunes

### Button Spacing

```css
/* Small */
.btn-sm {
  padding: 8px 16px;
  gap: 8px; /* Icon spacing */
}

/* Medium */
.btn-md {
  padding: 12px 24px;
  gap: 8px;
}

/* Large */
.btn-lg {
  padding: 16px 32px;
  gap: 12px;
}
```

```tsx
<button className="flex items-center gap-2 py-3 px-6">
  <Icon />
  <span>Add to Cart</span>
</button>
```

### Card Spacing

```tsx
<div className="bg-white rounded-lg p-6 space-y-4">
  {/* 24px padding, 16px entre elementos */}
  <img className="w-full h-64 object-cover rounded-lg" />
  <h3 className="text-xl font-semibold">Product Name</h3>
  <p className="text-sm text-neutral-700">Description...</p>
  <div className="flex items-center justify-between pt-4">
    {/* 16px padding-top para separar visualmente */}
    <span>$99.99</span>
    <button>Add to Cart</button>
  </div>
</div>
```

### Modal Spacing

```tsx
<div className="bg-white rounded-lg p-8 max-w-md w-full">
  {/* 32px padding para modales */}
  <h2 className="text-2xl font-bold mb-6">Title</h2>
  {/* 24px margin-bottom */}
  <div className="space-y-4">
    {/* 16px entre elementos */}
    <p>Content...</p>
  </div>
  <div className="flex gap-3 mt-8">
    {/* 32px margin-top, 12px gap entre botones */}
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</div>
```

---

## Responsive Spacing

### Mobile-First Approach

```tsx
// Aumentar spacing en pantallas grandes
<div className="space-y-4 md:space-y-6 lg:space-y-8">
  {/* 16px → 24px → 32px */}
</div>

// Padding responsive
<div className="p-4 md:p-6 lg:p-8">
  {/* 16px → 24px → 32px */}
</div>

// Container padding
<div className="px-4 md:px-8 lg:px-12">
  {/* 16px → 32px → 48px */}
</div>
```

---

## Stack Component (Vertical Spacing)

```tsx
// components/ui/Stack.tsx
import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const stackVariants = cva('flex flex-col', {
  variants: {
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',     // 4px
      sm: 'gap-2',     // 8px
      md: 'gap-4',     // 16px
      lg: 'gap-6',     // 24px
      xl: 'gap-8',     // 32px
      '2xl': 'gap-12', // 48px
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

interface StackProps extends VariantProps<typeof stackVariants> {
  children: ReactNode;
  className?: string;
}

export function Stack({ children, spacing, className }: StackProps) {
  return (
    <div className={stackVariants({ spacing, className })}>
      {children}
    </div>
  );
}
```

**Uso:**

```tsx
<Stack spacing="lg">
  <h2>Title</h2>
  <p>Description</p>
  <button>Action</button>
</Stack>
```

---

## Buenas Prácticas

### ✅ DO

- Usar múltiplos de 8px siempre que sea posible
- Aumentar spacing en pantallas grandes
- Usar `space-y-*` y `gap-*` utilities de Tailwind
- Mantener spacing consistente en componentes similares
- Usar menos spacing en mobile, más en desktop

### ❌ DON'T

- No usar valores arbitrarios (ej: `padding: 13px`)
- No usar spacing inconsistente
- No comprimir demasiado en mobile
- No exagerar spacing en elementos pequeños
- No usar spacing negativos sin razón

---

## Ejemplos Visuales

### Product Card Spacing

```
┌────────────────────────────┐
│  ┌──────────────────────┐  │ ← 24px padding
│  │                      │  │
│  │      Image           │  │
│  │                      │  │
│  └──────────────────────┘  │
│                            │
│  ⬇ 16px gap                │
│                            │
│  Product Name              │
│  ⬇ 8px gap                 │
│  Description               │
│  ⬇ 16px gap                │
│  $99.99  [Add to Cart]     │
│                            │
└────────────────────────────┘
```

### Form Spacing

```
┌────────────────────────────┐
│  Label                     │
│  ⬇ 8px gap                 │
│  ┌──────────────────────┐  │
│  │ Input field          │  │
│  └──────────────────────┘  │
│                            │
│  ⬇ 24px gap                │
│                            │
│  Label                     │
│  ⬇ 8px gap                 │
│  ┌──────────────────────┐  │
│  │ Input field          │  │
│  └──────────────────────┘  │
│                            │
│  ⬇ 32px gap                │
│                            │
│  [Submit Button]           │
└────────────────────────────┘
```

---

## Touch Targets (Mobile)

Mínimo **44x44px** para elementos táctiles según Apple HIG y Material Design.

```tsx
// Botón con touch target adecuado
<button className="min-h-[44px] min-w-[44px] py-3 px-6">
  Click me
</button>

// Icon button
<button className="w-11 h-11 flex items-center justify-center">
  <Icon className="w-5 h-5" />
</button>
```

---

**Última actualización**: 2025-11-15
