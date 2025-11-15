# Componentes - Resumen Completo

Guía rápida de todos los componentes disponibles en el Design System.

---

## 🔹 Componentes Atómicos

### Button
**Variantes**: primary, secondary, ghost, danger, outline
**Tamaños**: sm, md, lg
**Estados**: normal, hover, active, focus, disabled, loading

```tsx
<Button variant="primary" size="md">Add to Cart</Button>
<Button variant="secondary" icon={<Heart />}>Save</Button>
<Button variant="danger" loading>Deleting...</Button>
```

**Cuándo usar**: Acciones principales, CTAs, submit de formularios

---

### Input
**Variantes**: text, email, password, number, search
**Estados**: normal, focus, error, disabled

```tsx
<Input type="email" placeholder="Email" />
<Input type="password" error="Password is required" />
<Input type="search" icon={<Search />} />
```

**Anatomía**:
- Label (opcional)
- Input field
- Helper text / Error message
- Icon (opcional)

---

### Badge
**Variantes**: default, success, error, warning, accent
**Tamaños**: sm, md

```tsx
<Badge variant="error">-25% OFF</Badge>
<Badge variant="success">In Stock</Badge>
<Badge variant="accent">New</Badge>
```

**Uso común**: Descuentos, estados, etiquetas de producto

---

### Checkbox
**Estados**: unchecked, checked, indeterminate, disabled

```tsx
<Checkbox label="Accept terms and conditions" />
<Checkbox checked disabled label="Already selected" />
```

---

### Radio
**Uso**: Selección única entre opciones

```tsx
<RadioGroup>
  <Radio name="shipping" value="standard" label="Standard - $5.99" />
  <Radio name="shipping" value="express" label="Express - $12.99" />
</RadioGroup>
```

---

### Switch / Toggle
**Estados**: on, off, disabled

```tsx
<Switch label="Enable notifications" />
<Switch checked label="Dark mode" />
```

---

### Select
**Variantes**: single select, multi-select

```tsx
<Select placeholder="Select category">
  <Option value="electronics">Electronics</Option>
  <Option value="clothing">Clothing</Option>
</Select>
```

---

### Avatar
**Tamaños**: xs, sm, md, lg, xl
**Tipos**: image, initials, icon

```tsx
<Avatar src="/user.jpg" alt="John Doe" />
<Avatar initials="JD" />
<Avatar icon={<User />} />
```

---

### Tag / Chip
**Removable**: Con opción de cerrar

```tsx
<Tag>Electronics</Tag>
<Tag onRemove={() => {}}>Red <X /></Tag>
```

---

### Divider
**Orientación**: horizontal, vertical

```tsx
<Divider />
<Divider orientation="vertical" className="h-full" />
```

---

### Tooltip
**Posición**: top, right, bottom, left

```tsx
<Tooltip content="Add to favorites">
  <IconButton icon={<Heart />} />
</Tooltip>
```

---

## 🔸 Componentes Moleculares

### Card (Product Card)
**Variantes**: default, featured, compact

```tsx
<ProductCard>
  <ProductCard.Image src="/product.jpg" badge="-25%" />
  <ProductCard.Category>Electronics</ProductCard.Category>
  <ProductCard.Title>Laptop HP Pavilion</ProductCard.Title>
  <ProductCard.Description>High performance laptop...</ProductCard.Description>
  <ProductCard.Price original={12999} discount={9749} />
  <ProductCard.Actions>
    <Button fullWidth>Add to Cart</Button>
  </ProductCard.Actions>
</ProductCard>
```

**Anatomía**:
- Image (con badge opcional)
- Category tag
- Title
- Description
- Price component (original + discount)
- Actions (botones)

---

### Navbar / Topbar
**Variantes**: sticky, transparent, solid

```tsx
<Navbar sticky>
  <Navbar.Logo>
    <img src="/logo.svg" alt="Logo" />
  </Navbar.Logo>
  <Navbar.Search />
  <Navbar.Actions>
    <IconButton icon={<Heart />} badge={3} />
    <IconButton icon={<ShoppingCart />} badge={5} />
  </Navbar.Actions>
</Navbar>
```

---

### Search Bar
**Con debounce, filtros, autocomplete**

```tsx
<SearchBar
  placeholder="Search products..."
  onSearch={handleSearch}
  filters={<FilterPanel />}
  suggestions={suggestions}
/>
```

---

### Price Component
**Muestra precio original, descuento y porcentaje**

```tsx
<Price
  original={12999}
  discount={9749}
  showPercentage
  size="lg"
/>
```

**Output**:
```
$129.99 (tachado)
$97.49 (verde, grande)
-25% OFF (badge rojo)
```

---

### Product Gallery
**Con thumbnails navegables**

```tsx
<ProductGallery
  images={[
    { url: '/img1.jpg', alt: 'Front view' },
    { url: '/img2.jpg', alt: 'Side view' },
    { url: '/img3.jpg', alt: 'Back view' },
  ]}
/>
```

**Características**:
- Imagen principal grande
- Thumbnails clickeables
- Navegación con flechas
- Zoom al hacer click (opcional)

---

### Variant Selector
**Para colores, tallas, etc.**

```tsx
<VariantSelector
  type="color"
  options={[
    { id: 'red', name: 'Red', value: '#FF0000' },
    { id: 'blue', name: 'Blue', value: '#0000FF' },
  ]}
  selected="red"
  onChange={handleChange}
/>
```

**Tipos**:
- Color swatches
- Size buttons
- Material options

---

### Pagination
**Para listados largos**

```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
/>
```

---

## 🔶 Componentes Organizacionales

### Modal / Dialog
**Para acciones importantes que requieren atención**

```tsx
<Modal open={isOpen} onClose={handleClose}>
  <Modal.Header>
    <Modal.Title>Confirm Deletion</Modal.Title>
    <Modal.Close />
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete this item?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </Modal.Footer>
</Modal>
```

**Características**:
- Backdrop oscuro
- Focus trap
- ESC para cerrar
- Click fuera para cerrar (opcional)

---

### Drawer / Side Panel
**Navegación o detalles laterales**

```tsx
<Drawer position="right" open={isOpen} onClose={handleClose}>
  <Drawer.Header>Shopping Cart</Drawer.Header>
  <Drawer.Body>
    {cartItems.map(item => <CartItem key={item.id} {...item} />)}
  </Drawer.Body>
  <Drawer.Footer>
    <Button fullWidth>Checkout - $249.99</Button>
  </Drawer.Footer>
</Drawer>
```

**Posiciones**: left, right, top, bottom

---

### Toast / Snackbar
**Notificaciones temporales**

```tsx
toast.success('Product added to cart');
toast.error('Failed to process payment');
toast.info('New products available');
```

**Variantes**: success, error, warning, info
**Posición**: top-right, bottom-right, etc.
**Auto-dismiss**: 3-5 segundos

---

### Loading States / Skeletons
**Mientras carga contenido**

```tsx
<ProductCardSkeleton />

<Skeleton className="h-64 w-full rounded-lg" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />
```

**Tipos**:
- Skeleton lines
- Skeleton cards
- Shimmer effect

---

### Empty States
**Cuando no hay contenido**

```tsx
<EmptyState
  icon={<ShoppingCart />}
  title="Your cart is empty"
  description="Add some products to get started"
  action={<Button>Browse Products</Button>}
/>
```

**Casos de uso**:
- Carrito vacío
- Sin resultados de búsqueda
- Sin favoritos
- Sin órdenes

---

### Confirmation Dialog
**Para acciones destructivas**

```tsx
<ConfirmDialog
  title="Delete Product?"
  description="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger"
  onConfirm={handleDelete}
  onCancel={handleCancel}
/>
```

---

## 📐 Layouts

### Container
**Ancho máximo centralizado**

```tsx
<Container maxWidth="lg">
  {/* Content */}
</Container>
```

**Max widths**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

---

### Grid
**Sistema de grid responsive**

```tsx
<Grid cols={{ base: 1, md: 2, lg: 4 }} gap={6}>
  {products.map(p => <ProductCard key={p.id} {...p} />)}
</Grid>
```

---

### Stack
**Espaciado vertical consistente**

```tsx
<Stack spacing="lg">
  <h1>Title</h1>
  <p>Description</p>
  <Button>Action</Button>
</Stack>
```

---

## 🎯 Patrones Comunes

### Form Pattern

```tsx
<form className="space-y-6">
  <Input label="Email" type="email" required />
  <Input label="Password" type="password" required />
  <Checkbox label="Remember me" />
  <Button fullWidth type="submit">Sign In</Button>
</form>
```

### Product Listing Pattern

```tsx
<Container>
  <Stack spacing="xl">
    <div className="flex justify-between">
      <h1>Products</h1>
      <Select placeholder="Sort by">
        <Option value="price-low">Price: Low to High</Option>
        <Option value="price-high">Price: High to Low</Option>
      </Select>
    </div>

    <Grid cols={{ base: 1, md: 3, lg: 4 }} gap={6}>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>

    <Pagination currentPage={1} totalPages={10} />
  </Stack>
</Container>
```

### Cart Summary Pattern

```tsx
<Card>
  <Stack spacing="md">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>$249.99</span>
    </div>
    <div className="flex justify-between text-success-500">
      <span>Discount</span>
      <span>-$50.00</span>
    </div>
    <Divider />
    <div className="flex justify-between font-bold text-lg">
      <span>Total</span>
      <span>$199.99</span>
    </div>
    <Button fullWidth variant="primary">
      Proceed to Checkout
    </Button>
  </Stack>
</Card>
```

---

## 📱 Responsive Patterns

### Mobile Navigation

```tsx
<MobileNav>
  <MobileNav.Toggle />
  <MobileNav.Menu>
    <MobileNav.Link href="/">Home</MobileNav.Link>
    <MobileNav.Link href="/products">Products</MobileNav.Link>
    <MobileNav.Link href="/cart">Cart</MobileNav.Link>
  </MobileNav.Menu>
</MobileNav>
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {/* Auto-responsive */}
</div>
```

---

## ✅ Checklist de Implementación

Cuando implementes un nuevo componente:

- [ ] Estados (normal, hover, active, focus, disabled)
- [ ] Variantes (al menos 2-3)
- [ ] Tamaños (sm, md, lg)
- [ ] Props TypeScript
- [ ] Accesibilidad (ARIA, keyboard nav)
- [ ] Responsive (mobile-first)
- [ ] Tests unitarios
- [ ] Storybook stories
- [ ] Documentación
- [ ] Ejemplos de uso

---

**Última actualización**: 2025-11-15
