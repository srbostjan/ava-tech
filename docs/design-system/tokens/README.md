# Design Tokens - Resumen

Los Design Tokens son los valores fundamentales que forman la base de todo el sistema de diseño.

---

## 📚 Tokens Disponibles

### [Colores](./colors.md)
Sistema de colores minimalista con paleta neutral y acento dorado.

**Tokens clave**:
- `neutral`: 50, 100, 400, 700, 900
- `accent`: 50, 500, 600
- `success`: 50, 500
- `error`: 50, 500
- `warning`: 500, 700

### [Tipografía](./typography.md)
Escala tipográfica basada en Inter con jerarquía clara.

**Tokens clave**:
- Font family: Inter
- Weights: 400, 500, 600, 700
- Sizes: xs (12px) → 5xl (48px)
- Line heights: 1.2 - 1.75

### [Espaciado](./spacing.md)
Sistema de grid de 8px para consistencia espacial.

**Tokens clave**:
- Grid base: 8px
- Spacing: 1 (4px) → 32 (128px)
- Aliases semánticos: xs, sm, md, lg, xl, 2xl, 3xl

### [Sombras](./shadows.md)
Sombras sutiles para crear profundidad y jerarquía.

**Tokens clave**:
- sm: Elevación mínima
- md: Cards estándar
- lg: Dropdowns, popovers
- xl: Modales
- 2xl: Elementos flotantes

### [Bordes](./borders.md)
Radios y anchos de borde consistentes.

**Tokens clave**:
- Radius: sm (4px), md (8px), lg (12px), xl (16px), full (9999px)
- Width: 1px (estándar), 2px (focus)
- Colors: neutral.100 (default), accent.500 (focus)

---

## 🎯 Quick Reference

### Archivo Consolidado de Tokens

```typescript
// lib/tokens/index.ts
export const tokens = {
  // Colores
  colors: {
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
  },

  // Tipografía
  typography: {
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3rem',
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Espaciado
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
  },

  // Sombras
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Bordes
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  borderWidth: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
  },
} as const;

export type Tokens = typeof tokens;
```

---

## 📋 Uso en Componentes

### Ejemplo: Button Component

```tsx
import { tokens } from '@/lib/tokens';

const Button = styled.button`
  /* Typography */
  font-family: ${tokens.typography.fonts.primary};
  font-weight: ${tokens.typography.weights.semibold};
  font-size: ${tokens.typography.sizes.base};

  /* Spacing */
  padding: ${tokens.spacing[3]} ${tokens.spacing[6]};

  /* Borders */
  border-radius: ${tokens.borderRadius.md};
  border: none;

  /* Colors */
  background-color: ${tokens.colors.accent[500]};
  color: ${tokens.colors.white};

  /* Shadow */
  box-shadow: ${tokens.shadows.sm};

  /* Hover */
  &:hover {
    background-color: ${tokens.colors.accent[600]};
    box-shadow: ${tokens.shadows.md};
  }
`;
```

### Ejemplo: Con Tailwind

```tsx
<button className="
  font-inter font-semibold text-base
  px-6 py-3
  rounded-md
  bg-accent-500 text-white
  shadow-sm hover:shadow-md
  hover:bg-accent-600
  transition-all
">
  Add to Cart
</button>
```

---

## 🎨 Guías de Uso

### Cuándo Usar Qué Token

| Necesidad | Token Recomendado | Ejemplo |
|-----------|-------------------|---------|
| Color de texto principal | `neutral.900` | Títulos, body text |
| Color de texto secundario | `neutral.700` | Labels, metadata |
| Color CTA principal | `accent.500` | Botones primarios |
| Espaciado entre elementos | `spacing[4]` (16px) | Gap estándar |
| Espaciado en cards | `spacing[6]` (24px) | Padding de cards |
| Radius de botones | `borderRadius.md` (8px) | Botones, inputs |
| Radius de cards | `borderRadius.lg` (12px) | Product cards |
| Sombra de cards | `shadows.md` | Elevación estándar |
| Sombra de modales | `shadows.xl` | Máxima elevación |

---

## 🔧 Herramientas

### Configuración de Tailwind

Ver cada archivo de token para configuración específica de Tailwind.

### CSS Custom Properties

```css
/* Importar tokens como CSS variables */
@import './tokens/colors.css';
@import './tokens/typography.css';
@import './tokens/spacing.css';
@import './tokens/shadows.css';
@import './tokens/borders.css';
```

### TypeScript Types

```typescript
import { tokens } from '@/lib/tokens';
import type { Tokens } from '@/lib/tokens';

// Autocompletado y type safety
const myColor: keyof typeof tokens.colors.neutral = '900';
```

---

## ✅ Buenas Prácticas

1. **Usar siempre tokens**: No hardcodear valores
2. **Nombrar semánticamente**: Usar aliases (sm, md, lg)
3. **Mantener consistencia**: No crear tokens ad-hoc
4. **Documentar cambios**: Actualizar docs al modificar tokens
5. **Versionar**: Usar semantic versioning para cambios

---

## 📖 Próximos Pasos

Una vez familiarizado con los tokens, explora:

1. [Componentes Atómicos](../components/atomic/README.md)
2. [Componentes Moleculares](../components/molecular/README.md)
3. [Lineamientos de Diseño](../guidelines/README.md)

---

**Última actualización**: 2025-11-15
