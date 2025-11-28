# Button - Componente Atómico

Botón versátil con múltiples variantes para acciones principales y secundarias.

---

## Variantes

### Primary (Principal)
CTA principal con color de acento.

```tsx
<Button variant="primary" size="md">
  Add to Cart
</Button>
```

### Secondary
Acción secundaria con borde.

```tsx
<Button variant="secondary" size="md">
  View Details
</Button>
```

### Ghost
Botón sin fondo, solo texto.

```tsx
<Button variant="ghost" size="md">
  Learn More
</Button>
```

### Danger
Acciones destructivas.

```tsx
<Button variant="danger" size="md">
  Delete Item
</Button>
```

---

## Tamaños

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| **sm** | 36px | 8px 16px | 14px | Acciones secundarias |
| **md** | 44px | 12px 24px | 16px | Botones estándar |
| **lg** | 52px | 16px 32px | 18px | CTAs principales |

---

## Estados

### Normal
Estado por defecto.

### Hover
Cambio de color y elevación.

### Active / Pressed
Feedback visual al hacer clic.

### Focus
Ring visible para accesibilidad (navegación por teclado).

### Disabled
Botón inactivo con opacidad reducida.

### Loading
Spinner mientras se procesa la acción.

---

## Implementación

```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md',
        secondary: 'border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white',
        ghost: 'text-accent-500 hover:bg-accent-50',
        danger: 'bg-error-500 text-white hover:bg-error-600 shadow-sm hover:shadow-md',
        outline: 'border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 text-base rounded-md',
        lg: 'h-13 px-8 text-lg rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

---

## Ejemplos de Uso

### Botón Básico

```tsx
<Button>
  Click me
</Button>
```

### Con Icono

```tsx
import { ShoppingCart } from 'lucide-react';

<Button icon={<ShoppingCart />}>
  Add to Cart
</Button>

// Icono a la derecha
<Button icon={<ArrowRight />} iconPosition="right">
  Next
</Button>
```

### Con Estado de Carga

```tsx
const [isLoading, setIsLoading] = useState(false);

<Button loading={isLoading} onClick={handleSubmit}>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>
```

### Botón Completo

```tsx
<Button fullWidth>
  Continue
</Button>
```

### Grupo de Botones

```tsx
<div className="flex gap-3">
  <Button variant="ghost">
    Cancel
  </Button>
  <Button variant="primary">
    Confirm
  </Button>
</div>
```

---

## Accesibilidad

### ✅ Características

1. **Touch Target**: Mínimo 44x44px (cumple con WCAG)
2. **Focus Ring**: Visible para navegación por teclado
3. **ARIA**: Usar `aria-label` cuando sea necesario
4. **Disabled State**: Pointer-events disabled + reduced opacity
5. **Loading State**: Aria-busy y feedback visual

### Ejemplos

```tsx
// Botón con aria-label
<Button aria-label="Add product to shopping cart">
  <ShoppingCart />
</Button>

// Botón con estado loading
<Button loading aria-busy="true">
  Processing
</Button>

// Botón deshabilitado con razón
<Button disabled title="Stock unavailable">
  Out of Stock
</Button>
```

---

## Cuándo Usar

### ✅ Usar Button Para:

- Acciones principales (Add to Cart, Buy Now)
- Submit de formularios
- Navegación importante (Next, Continue)
- Acciones destructivas (Delete, Remove)
- Modales y dialogs (Confirm, Cancel)

### ❌ No Usar Button Para:

- Navegación entre páginas → Usar `<Link>`
- Toggle states → Usar `Switch` o `Toggle`
- Selección múltiple → Usar `Checkbox`
- Abrir menús → Usar `MenuButton` específico

---

## Variaciones Adicionales

### Icon Button

```tsx
// components/ui/IconButton.tsx
export function IconButton({ icon, ...props }: { icon: React.ReactNode } & ButtonProps) {
  return (
    <Button
      className="aspect-square p-0"
      aria-label={props['aria-label'] ?? 'Button'}
      {...props}
    >
      {icon}
    </Button>
  );
}

// Uso
<IconButton
  icon={<Heart />}
  variant="ghost"
  aria-label="Add to favorites"
/>
```

### Button Group

```tsx
<div className="inline-flex border border-neutral-100 rounded-md divide-x divide-neutral-100">
  <Button variant="ghost" className="rounded-none rounded-l-md">
    Daily
  </Button>
  <Button variant="ghost" className="rounded-none bg-accent-50">
    Weekly
  </Button>
  <Button variant="ghost" className="rounded-none rounded-r-md">
    Monthly
  </Button>
</div>
```

---

## Mejores Prácticas

### ✅ DO

- Usar verbos de acción claros ("Add to Cart", no "Cart")
- Mantener texto conciso
- Usar variant="primary" solo para acción principal por pantalla
- Proveer feedback visual inmediato
- Incluir loading states para acciones asíncronas

### ❌ DON'T

- Múltiples botones primary en la misma vista
- Textos ambiguos ("OK", "Submit")
- Botones muy pequeños (< 44px en mobile)
- Olvidar estados disabled/loading
- Usar solo iconos sin labels (excepto iconos universales)

---

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## Storybook

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ShoppingCart, Heart, Trash2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Add to Cart',
    variant: 'primary',
    icon: <ShoppingCart />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Processing...',
    loading: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
```

---

**Última actualización**: 2025-11-15
