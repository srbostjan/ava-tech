# E-Commerce - Aplicación Web Completa

Aplicación de e-commerce moderna construida con **Next.js 15**, **TypeScript** y **Tailwind CSS**. Actualmente utiliza datos mock, pero está **completamente preparada para integrarse con AWS Amplify, AppSync y DynamoDB**.

## 🚀 Características

### Funcionalidades Actuales

- ✅ **Página de inicio** con productos destacados y categorías
- ✅ **Búsqueda de productos** con filtros (categoría, precio) y debounce
- ✅ **Detalles de producto** con:
  - Galería de imágenes con thumbnails
  - Selección de variantes (color, talla, etc.)
  - Especificaciones técnicas
  - Cálculo automático de descuentos
- ✅ **Carrito de compras** con:
  - Agregar/eliminar productos
  - Actualizar cantidades
  - Cálculo de subtotal, descuentos y total
  - Persistencia en localStorage
- ✅ **Checkout por WhatsApp** con mensaje prellenado
- ✅ **Botón flotante de WhatsApp** en todas las páginas
- ✅ **Diseño responsive** (mobile-first)
- ✅ **Tipado estricto con TypeScript**
- ✅ **Gestión de estado con Zustand**

### Preparado para AWS

- 📋 **Schema GraphQL** completo para AppSync
- 📋 **Documentación detallada** de integración con AWS (ver `BACKEND_SETUP.md`)
- 📋 **Estructura de datos** compatible con DynamoDB
- 📋 **Diseño de S3 bucket** para imágenes de productos

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Gestión de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Imágenes**: Next.js Image Optimization
- **Futuro Backend**: AWS Amplify + AppSync + DynamoDB

## 📁 Estructura del Proyecto

```
e-commerce/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Página de inicio
│   ├── search/              # Página de búsqueda
│   ├── product/[id]/        # Detalles de producto
│   ├── cart/                # Carrito de compras
│   └── layout.tsx           # Layout principal
├── components/              # Componentes React
│   ├── layout/              # Header, Footer
│   ├── product/             # ProductCard, ImageGallery, etc.
│   └── ui/                  # WhatsAppButton, CategoryCard
├── lib/                     # Lógica de negocio
│   ├── types/               # Tipos TypeScript
│   ├── mock/                # Datos mock (temporal)
│   ├── store/               # Zustand stores
│   └── utils/               # Utilidades (format, constants)
├── docs/                    # Documentación
│   └── graphql/
│       └── schema.graphql   # Schema GraphQL para AppSync
├── BACKEND_SETUP.md         # Guía completa de integración AWS
└── README.md                # Este archivo
```

## 🚦 Inicio Rápido

### Requisitos Previos

- Node.js 18+ y npm
- Git

### Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd e-commerce
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno** (opcional)

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**

Visita [http://localhost:3000](http://localhost:3000)

## 📱 Páginas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con productos destacados y categorías |
| `/search` | Búsqueda con filtros de categoría y precio |
| `/search?q=laptop` | Búsqueda por texto |
| `/search?category=cat-001` | Filtrar por categoría |
| `/product/prod-001` | Detalles de un producto específico |
| `/cart` | Carrito de compras |

## 🎨 Personalización

### Modificar Número de WhatsApp

Editar `lib/utils/constants.ts`:

```typescript
export const WHATSAPP_NUMBER = '5215512345678'; // Tu número
```

### Agregar/Modificar Productos Mock

Editar `lib/mock/products.ts`:

```typescript
export const mockProducts: Product[] = [
  {
    id: 'prod-009',
    name: 'Nuevo Producto',
    // ... resto de campos
  }
];
```

### Agregar Categorías

Editar `lib/mock/categories.ts`:

```typescript
export const mockCategories: Category[] = [
  // ... tus categorías
];
```

## 🔗 Integración con AWS

Para conectar esta aplicación con un backend real usando AWS Amplify:

1. **Leer la documentación completa**: Ver `BACKEND_SETUP.md`

2. **Inicializar Amplify**:

```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
```

3. **Agregar API GraphQL**:

```bash
amplify add api
# Usa el schema en docs/graphql/schema.graphql
amplify push
```

4. **Migrar código de mock a GraphQL**: Seguir pasos en `BACKEND_SETUP.md`

## 🧪 Testing (Próximamente)

```bash
npm run test        # Unit tests con Jest
npm run test:e2e    # E2E tests con Playwright
```

## 🏗️ Build para Producción

```bash
npm run build       # Genera build optimizado
npm run start       # Ejecuta versión de producción
```

## 📊 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Modo desarrollo con hot-reload |
| `npm run build` | Genera build de producción |
| `npm run start` | Ejecuta build de producción |
| `npm run lint` | Ejecuta ESLint |

## 🌐 Deploy

### Vercel (Recomendado)

1. Push a GitHub/GitLab
2. Conecta con [Vercel](https://vercel.com)
3. Deploy automático

### AWS Amplify Hosting

```bash
amplify add hosting
amplify publish
```

Ver más opciones en `BACKEND_SETUP.md`

## 📚 Documentación Adicional

- **Backend Setup**: `BACKEND_SETUP.md` - Guía completa para AWS
- **GraphQL Schema**: `docs/graphql/schema.graphql`
- **Tipos TypeScript**: `lib/types/index.ts`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Notas Importantes

- **Datos Mock**: Actualmente usa datos mock en `lib/mock/`. Estos serán reemplazados por GraphQL queries cuando se integre AWS.
- **WhatsApp**: Configurar número real en `lib/utils/constants.ts`
- **Imágenes**: Usa URLs de Unsplash para demo. En producción, usar S3.
- **Autenticación**: No implementada aún. Ver `BACKEND_SETUP.md` para Cognito.

## 🔒 Seguridad

- No commitear archivos `.env` con datos sensibles
- Usar variables de entorno para API keys
- Implementar autenticación antes de producción

## 🐛 Troubleshooting

### Error: "Module not found"

```bash
npm install
```

### Imágenes no cargan

Verifica conexión a internet (usa Unsplash)

### Carrito no persiste

Revisa que localStorage esté habilitado en el navegador

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

Desarrollado como proyecto de e-commerce preparado para AWS Amplify.

## 🚀 Roadmap

- [ ] Integrar AWS Amplify
- [ ] Conectar AppSync + DynamoDB
- [ ] Migrar imágenes a S3
- [ ] Implementar autenticación con Cognito
- [ ] Agregar panel de administración
- [ ] Sistema de reseñas
- [ ] Pasarela de pagos (Stripe/PayPal)
- [ ] Notificaciones por email (SES)
- [ ] Analytics y tracking

## 📞 Soporte

Para preguntas sobre AWS Amplify, consulta `BACKEND_SETUP.md` o la [documentación oficial](https://docs.amplify.aws/).

---

Hecho con ❤️ usando Next.js y preparado para AWS Amplify
