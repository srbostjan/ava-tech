# Sombras - Design Tokens

Sistema de sombras minimalista para crear profundidad y jerarquía visual.

---

## Filosofía de Sombras

En un design system minimalista, las sombras deben ser:
- **Sutiles**: Apenas perceptibles pero efectivas
- **Consistentes**: Usar solo las necesarias
- **Funcionales**: Indicar elevación y estado

---

## Tokens de Sombras

```typescript
export const shadows = {
  none: 'none',

  // Elevación mínima
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

  // Elevación estándar (cards)
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  // Elevación media (dropdowns, popovers)
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  // Elevación alta (modales, drawers)
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Elevación máxima (tooltips, notificaciones)
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Sombra interior (inputs focused)
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;
```

---

## Uso por Componente

| Componente | Sombra | Cuándo |
|------------|--------|--------|
| **Cards** | `shadow-md` | Estado normal |
| **Cards Hover** | `shadow-lg` | Al hacer hover |
| **Buttons** | `shadow-sm` | Botones elevados |
| **Dropdowns** | `shadow-lg` | Menús desplegables |
| **Modals** | `shadow-xl` | Modales y dialogs |
| **Popovers** | `shadow-lg` | Tooltips, popovers |
| **Inputs** | `shadow-none` | Estado normal |
| **Inputs Focus** | `shadow-inner` (opcional) | Al enfocar |
| **Images** | `shadow-none` | Sin sombra por defecto |

---

## Implementación CSS

```css
:root {
  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
               0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
               0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
               0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}

/* Clases de utilidad */
.shadow-sm {
  box-shadow: var(--shadow-sm);
}

.shadow-md {
  box-shadow: var(--shadow-md);
}

.shadow-lg {
  box-shadow: var(--shadow-lg);
}

.shadow-xl {
  box-shadow: var(--shadow-xl);
}

.shadow-2xl {
  box-shadow: var(--shadow-2xl);
}

.shadow-inner {
  box-shadow: var(--shadow-inner);
}

.shadow-none {
  box-shadow: none;
}
```

---

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
      },
    },
  },
};
```

---

## Ejemplos de Uso

### Product Card

```tsx
<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
  <img src="/product.jpg" alt="Product" className="rounded-t-lg" />
  <div className="p-6">
    <h3 className="text-xl font-semibold">Product Name</h3>
    <p className="text-neutral-700">$99.99</p>
  </div>
</div>
```

**Resultado**:
- Estado normal: sombra media (`shadow-md`)
- Hover: sombra grande (`shadow-lg`)
- Transición suave de 300ms

### Button Elevated

```tsx
<button className="bg-accent-500 text-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
  Add to Cart
</button>
```

**Resultado**:
- Botón con elevación sutil
- Hover: más elevación para feedback

### Modal

```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
    <h2 className="text-2xl font-bold mb-4">Confirm Action</h2>
    <p className="text-neutral-700 mb-6">Are you sure?</p>
    <div className="flex gap-3">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</div>
```

**Resultado**:
- Modal con sombra extra grande (`shadow-xl`)
- Se eleva sobre el backdrop oscuro

### Dropdown Menu

```tsx
<div className="relative">
  <button>Menu</button>
  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
    <a href="#" className="block px-4 py-2 hover:bg-neutral-50 rounded-md">
      Option 1
    </a>
    <a href="#" className="block px-4 py-2 hover:bg-neutral-50 rounded-md">
      Option 2
    </a>
  </div>
</div>
```

**Resultado**:
- Dropdown con sombra grande (`shadow-lg`)
- Elevación clara sobre contenido

---

## Sombras con Color

Para casos especiales (hover, focus, etc.):

```css
/* Focus ring con sombra de color */
.focus-ring {
  box-shadow: 0 0 0 3px rgba(196, 167, 125, 0.3);
}

/* Hover con acento */
.hover-accent {
  box-shadow: 0 4px 12px rgba(196, 167, 125, 0.2);
}

/* Error state */
.error-shadow {
  box-shadow: 0 0 0 2px rgba(185, 55, 55, 0.2);
}
```

```tsx
// Focus state con ring
<input className="border border-neutral-100 focus:ring-4 focus:ring-accent-500/30 focus:outline-none" />

// Button con sombra de acento en hover
<button className="bg-accent-500 hover:shadow-[0_4px_12px_rgba(196,167,125,0.3)]">
  Add to Cart
</button>
```

---

## Animaciones de Sombra

```css
/* Transición suave */
.shadow-transition {
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effect */
.card {
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

```tsx
<div className="shadow-md hover:shadow-lg transition-shadow duration-300">
  Card content
</div>
```

---

## Sombras en Modo Oscuro (Futuro)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.2);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3),
                 0 2px 4px -2px rgb(0 0 0 / 0.3);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4),
                 0 4px 6px -4px rgb(0 0 0 / 0.4);
    /* Sombras más intensas en modo oscuro */
  }
}
```

---

## Buenas Prácticas

### ✅ DO

- Usar sombras sutiles y consistentes
- Aumentar sombra en hover para feedback
- Usar `shadow-md` para cards
- Usar `shadow-lg` para dropdowns/popovers
- Usar `shadow-xl` para modales
- Transición suave entre estados (`transition-shadow`)

### ❌ DON'T

- No usar sombras muy oscuras (no minimalista)
- No mezclar múltiples niveles de sombra sin razón
- No usar sombras en todos los elementos
- No olvidar las transiciones
- No usar sombras muy grandes en elementos pequeños

---

## Capas de Elevación

Guía visual de elevación:

```
Z-Index 0:   Base (sin sombra)
Z-Index 10:  Cards (shadow-md)
Z-Index 20:  Sticky headers (shadow-sm)
Z-Index 30:  Dropdowns (shadow-lg)
Z-Index 40:  Modals (shadow-xl)
Z-Index 50:  Tooltips (shadow-2xl)
```

```typescript
export const zIndex = {
  base: 0,
  card: 10,
  sticky: 20,
  dropdown: 30,
  modal: 40,
  tooltip: 50,
  toast: 60,
} as const;
```

---

## Performance

### Optimización

```css
/* Usar transform en lugar de box-shadow para animaciones */
.card {
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  /* Más performante que cambiar box-shadow */
}
```

**Nota**: Cambiar `box-shadow` puede causar repaints. Para animaciones complejas, considera usar `transform: translateY()` combinado con una sombra fija más grande.

---

**Última actualización**: 2025-11-15
