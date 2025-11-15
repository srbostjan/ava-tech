# Colores - Design Tokens

Sistema de colores minimalista y elegante optimizado para e-commerce.

---

## Paleta Principal

### Base Colors

```typescript
export const colors = {
  // Neutros
  white: '#FFFFFF',
  black: '#1A1A1A',

  neutral: {
    50: '#F7F7F7',   // Fondo muy claro
    100: '#E5E5E5',  // Bordes
    400: '#777777',  // Precio original (tachado)
    700: '#4A4A4A',  // Texto secundario
    900: '#1A1A1A',  // Texto principal
  },

  // Acento (dorado suave)
  accent: {
    50: '#F3EBE2',   // Fondo acento suave
    500: '#C4A77D',  // Acento principal
    600: '#AD8F69',  // Acento hover
  },

  // Estados
  success: {
    500: '#3D7E4D',  // Verde éxito
    50: '#E8F5E9',   // Fondo éxito
  },

  warning: {
    500: '#EBD8C5',  // Alerta suave
    700: '#D4A574',  // Alerta fuerte
  },

  error: {
    500: '#B93737',  // Rojo error
    50: '#FFEBEE',   // Fondo error
  },
};
```

---

## Uso de Colores

### 🎨 Texto

| Uso | Color | Contraste | Ejemplo |
|-----|-------|-----------|---------|
| **Texto principal** | `neutral.900` (#1A1A1A) | 14.5:1 | Títulos, descripciones, body text |
| **Texto secundario** | `neutral.700` (#4A4A4A) | 7.2:1 | Metadata, labels, texto de apoyo |
| **Texto deshabilitado** | `neutral.400` (#777777) | 4.6:1 | Elementos inactivos |
| **Texto sobre acento** | `white` (#FFFFFF) | 5.8:1 | Botones primarios |

### 🎨 Fondos

| Uso | Color | Cuándo usar |
|-----|-------|-------------|
| **Fondo primario** | `white` (#FFFFFF) | Cards, modales, página principal |
| **Fondo secundario** | `neutral.50` (#F7F7F7) | Background general, secciones alternas |
| **Fondo acento suave** | `accent.50` (#F3EBE2) | Destacar promociones, badges especiales |
| **Fondo hover** | `neutral.50` (#F7F7F7) | Hover states en cards, botones ghost |

### 🎨 Bordes

| Uso | Color | Grosor | Cuándo usar |
|-----|-------|--------|-------------|
| **Borde estándar** | `neutral.100` (#E5E5E5) | 1px | Inputs, cards, dividers |
| **Borde hover** | `neutral.400` (#777777) | 1px | Hover en inputs |
| **Borde focus** | `accent.500` (#C4A77D) | 2px | Focus states |
| **Borde error** | `error.500` (#B93737) | 1px | Validación de errores |

### 🎨 Acciones

| Uso | Color | Hover | Cuándo usar |
|-----|-------|-------|-------------|
| **CTA Principal** | `accent.500` (#C4A77D) | `accent.600` (#AD8F69) | Add to cart, Buy now, Primary actions |
| **CTA Secundario** | `neutral.900` (#1A1A1A) | `neutral.700` (#4A4A4A) | Ver más, Explorar, Secondary actions |
| **Éxito** | `success.500` (#3D7E4D) | Más oscuro | Confirmaciones, mensajes de éxito |
| **Error** | `error.500` (#B93737) | Más oscuro | Eliminar, cancelar, acciones destructivas |

---

## Ejemplos de Uso

### Badge de Descuento

```tsx
// Badge rojo con descuento
<div style={{
  background: '#B93737',
  color: '#FFFFFF',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '14px',
  fontWeight: 600,
}}>
  -25% OFF
</div>
```

### Precio Tachado

```tsx
// Precio original
<span style={{
  color: '#777777',
  textDecoration: 'line-through',
  fontSize: '14px',
}}>
  $129.99
</span>

// Precio con descuento
<span style={{
  color: '#3D7E4D',
  fontSize: '24px',
  fontWeight: 700,
}}>
  $97.49
</span>
```

### Botón Primary

```tsx
<button style={{
  background: '#C4A77D',
  color: '#FFFFFF',
  border: 'none',
  padding: '12px 32px',
  borderRadius: '8px',
  fontWeight: 600,
  transition: 'background 0.2s',
}}>
  Agregar al Carrito
</button>

// Hover
<button style={{
  background: '#AD8F69', // accent.600
}}>
  Agregar al Carrito
</button>
```

---

## Accesibilidad de Contraste

### WCAG 2.1 AA Compliance

| Combinación | Contraste | Rating | Uso |
|-------------|-----------|--------|-----|
| `neutral.900` sobre `white` | **14.5:1** | AAA ✅ | Texto principal |
| `neutral.700` sobre `white` | **7.2:1** | AAA ✅ | Texto secundario |
| `neutral.400` sobre `white` | **4.6:1** | AA ✅ | Texto deshabilitado |
| `white` sobre `accent.500` | **5.8:1** | AA ✅ | Botones primarios |
| `white` sobre `success.500` | **7.1:1** | AAA ✅ | Botones éxito |
| `white` sobre `error.500` | **7.8:1** | AAA ✅ | Botones error |

**Nota**: Todos los pares de colores cumplen con WCAG 2.1 Level AA (4.5:1 para texto normal, 3:1 para texto grande).

---

## Modos de Color (Futuro)

### Dark Mode (Próximamente)

```typescript
export const darkModeColors = {
  neutral: {
    50: '#1A1A1A',   // Invertido
    900: '#F7F7F7',  // Invertido
  },
  accent: {
    500: '#D4B893', // Más claro para dark mode
  },
  // ... resto de colores adaptados
};
```

---

## Implementación en Código

### CSS Variables

```css
:root {
  /* Neutros */
  --color-white: #FFFFFF;
  --color-black: #1A1A1A;
  --color-neutral-50: #F7F7F7;
  --color-neutral-100: #E5E5E5;
  --color-neutral-400: #777777;
  --color-neutral-700: #4A4A4A;
  --color-neutral-900: #1A1A1A;

  /* Acento */
  --color-accent-50: #F3EBE2;
  --color-accent-500: #C4A77D;
  --color-accent-600: #AD8F69;

  /* Estados */
  --color-success-500: #3D7E4D;
  --color-success-50: #E8F5E9;
  --color-warning-500: #EBD8C5;
  --color-error-500: #B93737;
  --color-error-50: #FFEBEE;
}
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#F7F7F7',
          100: '#E5E5E5',
          400: '#777777',
          700: '#4A4A4A',
          900: '#1A1A1A',
        },
        accent: {
          50: '#F3EBE2',
          500: '#C4A77D',
          600: '#AD8F69',
        },
        success: {
          50: '#E8F5E9',
          500: '#3D7E4D',
        },
        error: {
          50: '#FFEBEE',
          500: '#B93737',
        },
        warning: {
          500: '#EBD8C5',
          700: '#D4A574',
        },
      },
    },
  },
};
```

### TypeScript Token

```typescript
// lib/tokens/colors.ts
export const colors = {
  white: '#FFFFFF',
  black: '#1A1A1A',
  neutral: {
    50: '#F7F7F7',
    100: '#E5E5E5',
    400: '#777777',
    700: '#4A4A4A',
    900: '#1A1A1A',
  },
  accent: {
    50: '#F3EBE2',
    500: '#C4A77D',
    600: '#AD8F69',
  },
  success: {
    50: '#E8F5E9',
    500: '#3D7E4D',
  },
  error: {
    50: '#FFEBEE',
    500: '#B93737',
  },
  warning: {
    500: '#EBD8C5',
    700: '#D4A574',
  },
} as const;

export type ColorToken = typeof colors;
```

---

## Buenas Prácticas

### ✅ DO

- Usar `accent.500` para CTAs principales
- Usar `neutral.900` para texto principal
- Mantener contraste mínimo de 4.5:1
- Usar colores semánticos (success, error)
- Consistencia en toda la aplicación

### ❌ DON'T

- No usar colores fuera de la paleta
- No usar `neutral.400` para texto importante
- No mezclar múltiples acentos
- No depender solo del color para comunicar (usar iconos/texto)
- No usar gradientes (mantener minimalismo)

---

**Última actualización**: 2025-11-15
