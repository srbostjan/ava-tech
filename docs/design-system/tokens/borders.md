# Bordes - Design Tokens

Sistema de bordes para crear separación visual y delimitar elementos.

---

## Border Radius

Radios de borde consistentes para mantener estética minimalista.

```typescript
export const borderRadius = {
  none: '0px',
  sm: '4px',    // Elementos pequeños (badges, tags)
  md: '8px',    // Estándar (buttons, inputs, cards)
  lg: '12px',   // Cards grandes, modales
  xl: '16px',   // Hero cards, imágenes destacadas
  '2xl': '24px', // Elementos muy grandes
  full: '9999px', // Círculos, pills
} as const;
```

### Uso por Componente

| Componente | Radius | Valor | Ejemplo |
|------------|--------|-------|---------|
| **Button** | `md` | 8px | Botones estándar |
| **Input** | `md` | 8px | Campos de formulario |
| **Badge** | `full` | 9999px | Badges, pills |
| **Tag** | `sm` | 4px | Tags, chips |
| **Card** | `lg` | 12px | Product cards |
| **Modal** | `lg` | 12px | Modales, drawers |
| **Avatar** | `full` | 9999px | Avatares circulares |
| **Image** | `md` / `lg` | 8px / 12px | Imágenes de producto |

---

## Border Width

```typescript
export const borderWidth = {
  0: '0px',
  1: '1px',     // Estándar
  2: '2px',     // Focus states, divisores enfáticos
  4: '4px',     // Muy raro, solo para énfasis extremo
} as const;
```

### Uso

| Componente | Width | Cuándo |
|------------|-------|--------|
| **Input** | 1px | Estado normal |
| **Input Focus** | 2px | Estado focus |
| **Card** | 1px | Border sutil (opcional) |
| **Divider** | 1px | Líneas divisoras |
| **Focus Ring** | 2px-3px | Outline de accesibilidad |

---

## Border Colors

Basados en la paleta de colores principal:

```typescript
export const borderColors = {
  default: '#E5E5E5',    // neutral.100
  hover: '#777777',      // neutral.400
  focus: '#C4A77D',      // accent.500
  error: '#B93737',      // error.500
  success: '#3D7E4D',    // success.500
  transparent: 'transparent',
} as const;
```

---

## CSS Variables

```css
:root {
  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Border Width */
  --border-width-0: 0px;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;

  /* Border Colors */
  --border-color-default: #E5E5E5;
  --border-color-hover: #777777;
  --border-color-focus: #C4A77D;
  --border-color-error: #B93737;
  --border-color-success: #3D7E4D;
}
```

---

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      borderWidth: {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        'DEFAULT': '1px',
      },
      borderColor: {
        'DEFAULT': '#E5E5E5',
      },
    },
  },
};
```

---

## Ejemplos de Uso

### Input con Border

```tsx
<input
  type="text"
  className="
    border border-neutral-100
    focus:border-accent-500
    focus:ring-2 focus:ring-accent-500/30
    rounded-md
    px-4 py-3
    outline-none
    transition-colors
  "
  placeholder="Email"
/>
```

**Estados**:
- Normal: `border-neutral-100` (gris claro)
- Focus: `border-accent-500` (acento) + ring


### Card con Border Sutil

```tsx
<div className="bg-white border border-neutral-100 rounded-lg p-6 hover:border-neutral-400 transition-colors">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

**Estados**:
- Normal: borde gris muy claro
- Hover: borde gris más oscuro

### Button con Border (Outline Variant)

```tsx
<button className="
  border-2 border-accent-500
  text-accent-500
  hover:bg-accent-500 hover:text-white
  rounded-md
  px-6 py-3
  font-semibold
  transition-all
">
  View Details
</button>
```

### Badge / Pill

```tsx
<span className="
  inline-flex items-center
  bg-error-500
  text-white
  px-3 py-1
  rounded-full
  text-sm font-semibold
">
  -25% OFF
</span>
```

**Radius**: `rounded-full` (9999px)

### Divider

```tsx
{/* Horizontal divider */}
<hr className="border-t border-neutral-100 my-6" />

{/* Vertical divider */}
<div className="border-l border-neutral-100 h-full mx-4" />
```

---

## Focus States

### Accesibilidad

Focus rings visibles para navegación por teclado:

```css
/* Focus ring estándar */
.focus-ring {
  outline: 2px solid #C4A77D;
  outline-offset: 2px;
}

/* Focus ring con box-shadow (más común) */
.focus-ring-shadow {
  box-shadow: 0 0 0 3px rgba(196, 167, 125, 0.3);
}
```

```tsx
// Focus visible solo con teclado
<button className="
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-accent-500
  focus-visible:ring-offset-2
">
  Click me
</button>
```

---

## Componentes con Variantes de Borde

### Card Variants

```tsx
// Sin borde (solo sombra)
<div className="bg-white rounded-lg shadow-md p-6">
  Card without border
</div>

// Con borde
<div className="bg-white rounded-lg border border-neutral-100 p-6">
  Card with border
</div>

// Con borde y sombra
<div className="bg-white rounded-lg border border-neutral-100 shadow-sm p-6">
  Card with border and shadow
</div>
```

### Button Variants

```tsx
// Solid (sin borde visible)
<button className="bg-accent-500 text-white rounded-md px-6 py-3">
  Primary
</button>

// Outline
<button className="border-2 border-accent-500 text-accent-500 rounded-md px-6 py-3">
  Secondary
</button>

// Ghost (sin borde, solo hover)
<button className="text-accent-500 hover:bg-accent-50 rounded-md px-6 py-3">
  Tertiary
</button>
```

---

## Rounded Corners por Lado

```css
/* Top corners */
.rounded-t-lg {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

/* Bottom corners */
.rounded-b-lg {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* Left corners */
.rounded-l-lg {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

/* Right corners */
.rounded-r-lg {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* Esquinas individuales */
.rounded-tl-lg { border-top-left-radius: 12px; }
.rounded-tr-lg { border-top-right-radius: 12px; }
.rounded-bl-lg { border-bottom-left-radius: 12px; }
.rounded-br-lg { border-bottom-right-radius: 12px; }
```

**Ejemplo**: Card con imagen

```tsx
<div className="bg-white rounded-lg overflow-hidden">
  <img src="/product.jpg" className="w-full h-64 object-cover" />
  {/* Imagen hereda rounded-top del padre con overflow-hidden */}
  <div className="p-6">
    <h3>Product Name</h3>
  </div>
</div>
```

---

## Border Gradients (Avanzado)

Para efectos especiales (usar con moderación):

```css
.border-gradient {
  position: relative;
  background: white;
  border-radius: 12px;
}

.border-gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(135deg, #C4A77D, #AD8F69);
  -webkit-mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

---

## Responsive Borders

```tsx
// Border radius responsive
<div className="rounded-md md:rounded-lg lg:rounded-xl">
  {/* 8px → 12px → 16px */}
</div>

// Border width responsive (raro, pero posible)
<div className="border md:border-2">
  {/* 1px → 2px */}
</div>
```

---

## Buenas Prácticas

### ✅ DO

- Usar `rounded-lg` (12px) para cards
- Usar `rounded-md` (8px) para buttons e inputs
- Usar `rounded-full` para badges circulares
- Mantener consistencia en toda la app
- Usar bordes sutiles (`border-neutral-100`)
- Focus rings visibles para accesibilidad

### ❌ DON'T

- No mezclar múltiples radios sin razón
- No usar bordes muy gruesos (>2px) sin propósito
- No olvidar focus states
- No usar border radius muy grandes en elementos pequeños
- No usar bordes oscuros sin contraste adecuado

---

## Combinaciones Comunes

### Input Group

```tsx
<div className="flex">
  <input
    type="text"
    className="border border-r-0 border-neutral-100 rounded-l-md px-4 py-3"
    placeholder="Email"
  />
  <button className="bg-accent-500 text-white px-6 rounded-r-md">
    Subscribe
  </button>
</div>
```

### Segmented Control

```tsx
<div className="inline-flex border border-neutral-100 rounded-md p-1">
  <button className="px-4 py-2 rounded-md bg-accent-500 text-white">
    Monthly
  </button>
  <button className="px-4 py-2 rounded-md hover:bg-neutral-50">
    Yearly
  </button>
</div>
```

---

**Última actualización**: 2025-11-15
