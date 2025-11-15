# Design System - E-Commerce Minimalista

> Sistema de diseño completo, escalable y profesional para aplicaciones e-commerce modernas.

## 📋 Índice

1. [Introducción](#introducción)
2. [Filosofía de Diseño](#filosofía-de-diseño)
3. [Design Tokens](./tokens/README.md)
   - [Colores](./tokens/colors.md)
   - [Tipografía](./tokens/typography.md)
   - [Espaciado](./tokens/spacing.md)
   - [Sombras](./tokens/shadows.md)
   - [Bordes](./tokens/borders.md)
4. [Componentes Atómicos](./components/atomic/README.md)
5. [Componentes Moleculares](./components/molecular/README.md)
6. [Componentes Organizacionales](./components/organizational/README.md)
7. [Lineamientos](./guidelines/README.md)
8. [Ejemplos de Implementación](./examples/README.md)

---

## Introducción

Este Design System está diseñado para crear experiencias de e-commerce **minimalistas, elegantes y accesibles**. Inspirado en las mejores prácticas de marcas como Apple, Shopify y Stripe, prioriza:

- **Claridad visual**: Espaciado amplio, jerarquía clara
- **Consistencia**: Componentes reutilizables con comportamiento predecible
- **Accesibilidad**: WCAG 2.1 AA como mínimo
- **Performance**: Optimizado para web y mobile
- **Escalabilidad**: Fácil de extender y mantener

---

## Filosofía de Diseño

### Principios Core

#### 1. **Minimalismo Funcional**
- Cada elemento tiene un propósito claro
- Eliminación de elementos decorativos innecesarios
- Enfoque en contenido y acción

#### 2. **Espaciado Generoso**
- Grid de 8px para consistencia
- Márgenes y paddings amplios
- "White space" como elemento de diseño

#### 3. **Jerarquía Visual Clara**
- Tipografía con escalas bien definidas
- Uso estratégico del color de acento
- Contraste adecuado para accesibilidad

#### 4. **Mobile-First**
- Diseño responsive desde el inicio
- Touch targets de 44x44px mínimo
- Optimización para pulgar (thumb-friendly)

#### 5. **Accesibilidad Universal**
- Contraste mínimo 4.5:1 para texto
- Focus states visibles
- Soporte para lectores de pantalla
- Navegación por teclado

---

## Stack Tecnológico

Este Design System está optimizado para:

- **Framework**: React 18+ / Next.js 14+
- **Estilos**: CSS-in-JS (Styled Components) o Tailwind CSS
- **Tipografía**: System fonts + Inter (Google Fonts)
- **Iconografía**: Lucide React o Heroicons
- **Testing**: Jest + Testing Library
- **Documentación**: Storybook

---

## Estructura del Sistema

```
design-system/
├── tokens/               # Design tokens (valores base)
│   ├── colors.md
│   ├── typography.md
│   ├── spacing.md
│   ├── shadows.md
│   └── borders.md
├── components/
│   ├── atomic/          # Componentes básicos (botones, inputs)
│   ├── molecular/       # Componentes compuestos (cards, navbar)
│   └── organizational/  # Layouts y templates
├── guidelines/          # Reglas de uso
│   ├── accessibility.md
│   ├── responsive.md
│   └── best-practices.md
└── examples/           # Ejemplos de implementación
```

---

## Quick Start

### Instalación de Dependencias

```bash
npm install lucide-react clsx class-variance-authority
```

### Configurar Tokens

```typescript
// lib/design-tokens.ts
export const tokens = {
  colors: {
    white: '#FFFFFF',
    neutral: {
      50: '#F7F7F7',
      100: '#E5E5E5',
      700: '#4A4A4A',
      900: '#1A1A1A',
    },
    accent: {
      500: '#C4A77D',
      600: '#AD8F69',
      50: '#F3EBE2',
    },
    // ... más colores
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  // ... más tokens
};
```

### Usar Componentes

```tsx
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function ProductCard() {
  return (
    <Card>
      <Card.Image src="/product.jpg" alt="Product" />
      <Card.Title>Product Name</Card.Title>
      <Card.Price original={12999} discount={9999} />
      <Button variant="primary" size="lg">
        Add to Cart
      </Button>
    </Card>
  );
}
```

---

## Versionado

Este Design System sigue **Semantic Versioning**:

- **MAJOR**: Cambios que rompen compatibilidad
- **MINOR**: Nueva funcionalidad compatible hacia atrás
- **PATCH**: Bug fixes

**Versión actual**: `1.0.0`

---

## Contribuciones

Para contribuir al Design System:

1. Proponer cambios en Issues
2. Documentar nuevos componentes
3. Incluir ejemplos y tests
4. Actualizar Storybook

---

## Recursos Adicionales

- [Figma Design Files](#) (próximamente)
- [Storybook Live](#) (próximamente)
- [Playground Interactivo](#) (próximamente)

---

## Licencia

MIT License - Libre para uso comercial y personal

---

**Mantenido por**: Equipo de Diseño
**Última actualización**: 2025-11-15
