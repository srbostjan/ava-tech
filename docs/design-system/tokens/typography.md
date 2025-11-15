# Tipografía - Design Tokens

Sistema tipográfico minimalista con excelente legibilidad y jerarquía clara.

---

## Font Families

### Primary Font: Inter

**Inter** es una fuente sans-serif diseñada específicamente para pantallas, con excelente legibilidad en todos los tamaños.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
```

**CDN** (Google Fonts):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**NPM**:
```bash
npm install @fontsource/inter
```

```typescript
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
```

### Secondary Font: System Fonts

Para performance óptima, podemos usar system fonts:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

---

## Font Weights

| Weight | Valor | Uso |
|--------|-------|-----|
| **Regular** | 400 | Texto body, párrafos |
| **Medium** | 500 | Subtítulos, labels |
| **Semibold** | 600 | Botones, badges, destacados |
| **Bold** | 700 | Títulos, headings |

---

## Escala Tipográfica

### Headings

| Elemento | Tamaño | Line Height | Weight | Uso |
|----------|--------|-------------|--------|-----|
| **H1** | 48px (3rem) | 56px (1.167) | 700 | Hero titles, página principal |
| **H2** | 40px (2.5rem) | 48px (1.2) | 700 | Section titles |
| **H3** | 32px (2rem) | 40px (1.25) | 700 | Subsection titles |
| **H4** | 24px (1.5rem) | 32px (1.333) | 600 | Card titles, product names |
| **H5** | 20px (1.25rem) | 28px (1.4) | 600 | Small headings |
| **H6** | 18px (1.125rem) | 24px (1.333) | 600 | Minor headings |

### Body Text

| Elemento | Tamaño | Line Height | Weight | Uso |
|----------|--------|-------------|--------|-----|
| **Large** | 18px (1.125rem) | 28px (1.556) | 400 | Intro text, destacados |
| **Base** | 16px (1rem) | 24px (1.5) | 400 | Texto principal, descripciones |
| **Small** | 14px (0.875rem) | 20px (1.429) | 400 | Metadata, labels, captions |
| **XSmall** | 12px (0.75rem) | 16px (1.333) | 500 | Badges, tiny labels |

---

## Tokens TypeScript

```typescript
export const typography = {
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },

  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
    '5xl': '3rem',    // 48px
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.025em',
  },
} as const;
```

---

## CSS Classes

```css
/* Headings */
.heading-1 {
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.heading-2 {
  font-size: 40px;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.heading-3 {
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
}

.heading-4 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}

.heading-5 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.heading-6 {
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
}

/* Body */
.body-large {
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
}

.body-base {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.body-small {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

.body-xs {
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
}

/* Utilities */
.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}
```

---

## Componentes React

### Typography Component

```tsx
// components/ui/Typography.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-5xl font-bold leading-tight tracking-tight',
      h2: 'text-4xl font-bold leading-tight tracking-tight',
      h3: 'text-3xl font-bold',
      h4: 'text-2xl font-semibold',
      h5: 'text-xl font-semibold',
      h6: 'text-lg font-semibold',
      'body-lg': 'text-lg leading-relaxed',
      body: 'text-base leading-normal',
      'body-sm': 'text-sm leading-normal',
      caption: 'text-xs font-medium',
    },
    color: {
      primary: 'text-neutral-900',
      secondary: 'text-neutral-700',
      muted: 'text-neutral-400',
      accent: 'text-accent-500',
      success: 'text-success-500',
      error: 'text-error-500',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
}

export function Typography({
  children,
  variant,
  color,
  as: Component = 'p',
  className,
}: TypographyProps) {
  return (
    <Component className={typographyVariants({ variant, color, className })}>
      {children}
    </Component>
  );
}
```

### Ejemplos de Uso

```tsx
// Título principal
<Typography variant="h1" as="h1">
  Bienvenido a nuestra tienda
</Typography>

// Título de producto
<Typography variant="h4" as="h3">
  Laptop HP Pavilion 15"
</Typography>

// Descripción
<Typography variant="body" color="secondary">
  Laptop de alto rendimiento con procesador Intel Core i7
</Typography>

// Precio
<Typography variant="h3" color="success" as="span">
  $97.49
</Typography>

// Badge
<Typography variant="caption" as="span">
  NUEVO
</Typography>
```

---

## Responsive Typography

### Mobile

```css
@media (max-width: 640px) {
  .heading-1 {
    font-size: 36px;
    line-height: 42px;
  }

  .heading-2 {
    font-size: 32px;
    line-height: 38px;
  }

  .heading-3 {
    font-size: 24px;
    line-height: 32px;
  }

  .heading-4 {
    font-size: 20px;
    line-height: 28px;
  }
}
```

### Tailwind Responsive

```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  Hero Title
</h1>
```

---

## Accesibilidad

### ✅ Recomendaciones

1. **Tamaño mínimo**: 16px para body text
2. **Contraste**: Mínimo 4.5:1 para texto normal
3. **Line height**: Mínimo 1.5 para párrafos
4. **Letter spacing**: Evitar valores negativos en texto pequeño
5. **Jerarquía semántica**: Usar `<h1>` a `<h6>` correctamente

### ❌ Evitar

- Texto menor a 14px para contenido importante
- Line height menor a 1.2
- Justificación de texto (causa problemas de lectura)
- All caps en párrafos largos

---

## Truncate Text

```css
/* Single line */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line (2 lines) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

```tsx
<p className="truncate">
  Texto muy largo que se cortará...
</p>

<p className="line-clamp-2">
  Descripción de producto que se limitará a dos líneas...
</p>
```

---

## Ejemplos Prácticos

### Product Card

```tsx
<div className="space-y-2">
  {/* Category */}
  <Typography variant="body-sm" color="secondary">
    Electrónica
  </Typography>

  {/* Product Name */}
  <Typography variant="h4" className="line-clamp-2">
    Laptop HP Pavilion 15" Intel Core i7
  </Typography>

  {/* Description */}
  <Typography variant="body-sm" color="secondary" className="line-clamp-3">
    Laptop de alto rendimiento con procesador Intel Core i7...
  </Typography>

  {/* Price */}
  <div className="flex items-baseline gap-2">
    <Typography variant="body-sm" color="muted" className="line-through">
      $129.99
    </Typography>
    <Typography variant="h4" color="success">
      $97.49
    </Typography>
  </div>
</div>
```

---

**Última actualización**: 2025-11-15
