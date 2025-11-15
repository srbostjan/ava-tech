# Backend Setup Guide - AWS Amplify + AppSync + DynamoDB

Esta guía documenta **cómo integrar el backend de AWS** con la aplicación e-commerce actual que usa datos mock.

## Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Requisitos Previos](#requisitos-previos)
3. [Paso 1: Inicializar AWS Amplify](#paso-1-inicializar-aws-amplify)
4. [Paso 2: Configurar GraphQL API con AppSync](#paso-2-configurar-graphql-api-con-appsync)
5. [Paso 3: Configurar DynamoDB](#paso-3-configurar-dynamodb)
6. [Paso 4: Configurar Amazon S3 para Imágenes](#paso-4-configurar-amazon-s3-para-imágenes)
7. [Paso 5: Integrar Amplify en el Frontend](#paso-5-integrar-amplify-en-el-frontend)
8. [Paso 6: Migrar de Mock Data a GraphQL](#paso-6-migrar-de-mock-data-a-graphql)
9. [Paso 7: Configurar Autenticación (Opcional)](#paso-7-configurar-autenticación-opcional)
10. [Ejemplos de Queries y Mutations](#ejemplos-de-queries-y-mutations)
11. [Estructura de Tablas DynamoDB](#estructura-de-tablas-dynamodb)
12. [S3 Bucket Structure](#s3-bucket-structure)

---

## Arquitectura General

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         │ GraphQL API
         │
┌────────▼────────┐
│  AWS AppSync    │
│  (GraphQL API)  │
└────────┬────────┘
         │
         ├──────────────────┐
         │                  │
┌────────▼────────┐  ┌─────▼──────┐
│   DynamoDB      │  │ Amazon S3  │
│  (Database)     │  │  (Images)  │
└─────────────────┘  └────────────┘
         │
┌────────▼────────┐
│  Amazon Cognito │
│ (Auth - Optional)│
└─────────────────┘
```

### Componentes:

- **Next.js Frontend**: Aplicación React actual con datos mock
- **AWS AppSync**: API GraphQL serverless
- **DynamoDB**: Base de datos NoSQL para productos, categorías, carrito
- **Amazon S3**: Almacenamiento de imágenes de productos
- **Amazon Cognito**: Autenticación de usuarios (opcional para futuro)

---

## Requisitos Previos

1. **Cuenta de AWS** activa
2. **AWS CLI** instalada y configurada:
   ```bash
   aws configure
   ```
3. **Node.js** v18+ y npm
4. **Amplify CLI** instalada globalmente:
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

---

## Paso 1: Inicializar AWS Amplify

### 1.1 Inicializar Amplify en el proyecto

Desde la raíz del proyecto:

```bash
amplify init
```

Responde las preguntas:
- **Enter a name for the project**: `ecommerce`
- **Enter a name for the environment**: `dev`
- **Choose your default editor**: (tu editor preferido)
- **Choose the type of app**: `javascript`
- **What javascript framework**: `react`
- **Source Directory Path**: `.` (o `app` si usas estructura específica)
- **Distribution Directory Path**: `.next`
- **Build Command**: `npm run build`
- **Start Command**: `npm run dev`
- **Do you want to use an AWS profile?**: `Yes`

Esto creará:
- Carpeta `amplify/` con la configuración
- Archivo `amplifyconfiguration.json`

### 1.2 Agregar archivo `.gitignore` para Amplify

El archivo `.gitignore` ya debe incluir:
```
amplify/backend/awscloudformation
amplify/\#current-cloud-backend
amplify/.config/local-*
amplify/mock-data
amplify/mock-api-resources
```

---

## Paso 2: Configurar GraphQL API con AppSync

### 2.1 Agregar API GraphQL

```bash
amplify add api
```

Responde:
- **Select from one of the below mentioned services**: `GraphQL`
- **Here is the GraphQL API that we will create**: (confirma)
- **Provide API name**: `ecommerceapi`
- **Choose the default authorization type**: `API key` (o `Amazon Cognito User Pool` si usarás auth)
- **Enter a description**: `E-commerce GraphQL API`
- **After how many days from now the API key should expire**: `365`
- **Do you want to configure advanced settings?**: `No`
- **Do you have an annotated GraphQL schema?**: `Yes`
- **Provide your schema file path**: `docs/graphql/schema.graphql`

### 2.2 Schema GraphQL

El schema ya está definido en `docs/graphql/schema.graphql`. Este schema incluye:

- **Types**: `Product`, `Category`, `ProductVariant`, `Cart`, `CartItem`, `User`
- **Queries**: `listProducts`, `getProduct`, `searchProducts`, etc.
- **Mutations**: `createProduct`, `updateProduct`, `addToCart`, etc.
- **Subscriptions**: Para actualizaciones en tiempo real

### 2.3 Desplegar la API

```bash
amplify push
```

Esto creará:
- API GraphQL en AWS AppSync
- Tablas DynamoDB automáticamente basadas en los tipos `@model`
- Resolvers para queries y mutations

### 2.4 Verificar el despliegue

```bash
amplify status
```

Deberías ver:
```
| Category | Resource name | Operation | Provider plugin |
| -------- | ------------- | --------- | --------------- |
| Api      | ecommerceapi  | No Change | awscloudformation|
```

---

## Paso 3: Configurar DynamoDB

### 3.1 Tablas Automáticas

Amplify crea automáticamente tablas DynamoDB basadas en los tipos con directiva `@model`:

**Tablas creadas:**
- `Product-{env}-{hash}`
- `Category-{env}-{hash}`
- `ProductVariant-{env}-{hash}`
- `Cart-{env}-{hash}`
- `CartItem-{env}-{hash}`
- `User-{env}-{hash}` (si usas autenticación)

### 3.2 Estructura de Tabla: Product

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| **id** (PK) | String | ID único del producto |
| name | String | Nombre del producto |
| description | String | Descripción detallada |
| categoryId (GSI) | String | Foreign key a Category |
| specs | List<Map> | Especificaciones técnicas |
| priceOriginal | Number | Precio original en centavos |
| priceDiscount | Number | Precio con descuento |
| images | List<Map> | Array de imágenes (URLs de S3) |
| featured | Boolean | Producto destacado |
| createdAt | String | Timestamp de creación |
| updatedAt | String | Timestamp de actualización |

**Índices:**
- **GSI**: `productsByCategory` (categoryId)

### 3.3 Estructura de Tabla: Category

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| **id** (PK) | String | ID único de categoría |
| name | String | Nombre de categoría |
| description | String | Descripción |
| imageUrl | String | URL de imagen en S3 |
| parentCategoryId | String | Para categorías anidadas |

### 3.4 Estructura de Tabla: CartItem

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| **id** (PK) | String | ID único del item |
| cartId (GSI) | String | Foreign key a Cart |
| productId | String | Foreign key a Product |
| variantId | String | Foreign key a ProductVariant |
| quantity | Number | Cantidad |
| priceAtAdd | Number | Precio al agregar al carrito |

**Índices:**
- **GSI**: `itemsByCart` (cartId)

### 3.5 Poblar datos iniciales

Para migrar datos mock a DynamoDB, puedes usar el script (crear después):

```bash
npm run seed-db
```

O manualmente desde la consola de AWS AppSync usando mutations.

---

## Paso 4: Configurar Amazon S3 para Imágenes

### 4.1 Agregar Storage

```bash
amplify add storage
```

Responde:
- **Select from one of the below mentioned services**: `Content (Images, audio, video, etc.)`
- **Provide a friendly name**: `ecommerceimages`
- **Provide bucket name**: `ecommerce-products-bucket`
- **Who should have access**: `Auth and guest users` (o según necesidad)
- **What kind of access do you want for Authenticated users?**: `create/update, read, delete`
- **What kind of access do you want for Guest users?**: `read`

```bash
amplify push
```

### 4.2 Estructura propuesta en S3

```
s3://ecommerce-products-bucket/
├── products/
│   ├── prod-001/
│   │   ├── main.jpg
│   │   ├── gallery/
│   │   │   ├── image_1.jpg
│   │   │   ├── image_2.jpg
│   │   │   └── image_3.jpg
│   │   └── variants/
│   │       ├── var-001-silver/
│   │       │   ├── image_1.jpg
│   │       │   └── image_2.jpg
│   │       └── var-001-black/
│   │           └── image_1.jpg
│   └── prod-002/
│       └── ...
└── categories/
    ├── cat-001.jpg
    └── cat-002.jpg
```

### 4.3 Subir imágenes

Puedes usar AWS CLI o la consola:

```bash
aws s3 cp ./local/images/ s3://ecommerce-products-bucket/products/ --recursive
```

### 4.4 URLs firmadas

Para obtener URLs firmadas (con acceso temporal):

```typescript
import { Storage } from 'aws-amplify';

const imageUrl = await Storage.get('products/prod-001/main.jpg');
```

---

## Paso 5: Integrar Amplify en el Frontend

### 5.1 Instalar dependencias

```bash
npm install aws-amplify @aws-amplify/ui-react
```

### 5.2 Configurar Amplify en el layout

Editar `app/layout.tsx`:

```typescript
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
```

### 5.3 Generar tipos TypeScript desde GraphQL

```bash
amplify codegen add
```

Esto generará tipos TypeScript en `src/API.ts` (o similar) basados en el schema GraphQL.

---

## Paso 6: Migrar de Mock Data a GraphQL

### 6.1 Reemplazar mock data en páginas

**Antes (con mock):**
```typescript
// app/page.tsx
import { getFeaturedProducts } from '@/lib/mock/products';
const products = getFeaturedProducts();
```

**Después (con GraphQL):**
```typescript
// app/page.tsx
import { generateClient } from 'aws-amplify/api';
import { listProducts } from '@/graphql/queries';

const client = generateClient();

async function getFeaturedProducts() {
  const result = await client.graphql({
    query: listProducts,
    variables: {
      filter: { featured: { eq: true } }
    }
  });
  return result.data.listProducts.items;
}

// En componente:
const products = await getFeaturedProducts();
```

### 6.2 Reemplazar en Product Detail Page

**app/product/[id]/page.tsx:**

```typescript
import { getProduct } from '@/graphql/queries';

const product = await client.graphql({
  query: getProduct,
  variables: { id: params.id }
});
```

### 6.3 Reemplazar en Search Page

```typescript
import { searchProducts } from '@/graphql/queries';

const result = await client.graphql({
  query: searchProducts,
  variables: {
    filter: {
      searchQuery: query,
      categoryId: selectedCategory,
      minPrice: minPrice * 100,
      maxPrice: maxPrice * 100
    }
  }
});
```

### 6.4 Actualizar Cart Store para usar GraphQL

**lib/store/cartStore.ts:**

Agregar mutations al agregar/actualizar/eliminar items:

```typescript
import { addToCart, updateCartItemQuantity, deleteCartItem } from '@/graphql/mutations';

// En addItem:
await client.graphql({
  mutation: addToCart,
  variables: {
    productId: product.id,
    variantId: variant?.id,
    quantity
  }
});
```

---

## Paso 7: Configurar Autenticación (Opcional)

Si deseas que los usuarios inicien sesión:

### 7.1 Agregar autenticación

```bash
amplify add auth
```

Responde:
- **Do you want to use the default authentication and security configuration?**: `Default configuration`
- **How do you want users to be able to sign in?**: `Email`
- **Do you want to configure advanced settings?**: `No, I am done.`

```bash
amplify push
```

### 7.2 Actualizar schema GraphQL

Cambiar reglas de autorización:

```graphql
type Cart @model @auth(rules: [{ allow: owner }]) {
  # ...
}
```

Esto restringe el carrito solo al usuario propietario.

### 7.3 Agregar componente de login

Usar `@aws-amplify/ui-react`:

```typescript
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <p>Welcome {user.username}</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}
```

---

## Ejemplos de Queries y Mutations

### Query: Listar productos destacados

```graphql
query ListFeaturedProducts {
  listProducts(filter: { featured: { eq: true } }) {
    items {
      id
      name
      description
      priceOriginal
      priceDiscount
      images {
        url
        isThumbnail
      }
      categoryId
    }
    nextToken
  }
}
```

### Query: Obtener producto por ID

```graphql
query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    name
    description
    categoryId
    specs {
      key
      value
    }
    priceOriginal
    priceDiscount
    images {
      url
      isThumbnail
      variantId
      alt
    }
    variants {
      items {
        id
        name
        type
        stockAvailable
        images {
          url
        }
      }
    }
  }
}
```

### Query: Buscar productos

```graphql
query SearchProducts($query: String, $categoryId: ID) {
  searchProducts(
    filter: {
      searchQuery: $query
      categoryId: $categoryId
    }
  ) {
    items {
      id
      name
      description
      priceDiscount
      images {
        url
        isThumbnail
      }
    }
    nextToken
  }
}
```

### Mutation: Crear producto

```graphql
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    description
    priceOriginal
    priceDiscount
  }
}
```

Variables:
```json
{
  "input": {
    "name": "Laptop Dell XPS 15",
    "description": "Laptop de alto rendimiento...",
    "categoryId": "cat-001",
    "priceOriginal": 149999,
    "priceDiscount": 129999,
    "specs": [
      { "key": "Procesador", "value": "Intel i7" },
      { "key": "RAM", "value": "16GB" }
    ],
    "images": [
      {
        "url": "s3://bucket/products/prod-009/main.jpg",
        "isThumbnail": true
      }
    ],
    "featured": true
  }
}
```

### Mutation: Agregar al carrito

```graphql
mutation AddToCart($productId: ID!, $variantId: ID, $quantity: Int!) {
  addToCart(productId: $productId, variantId: $variantId, quantity: $quantity) {
    id
    productId
    quantity
    priceAtAdd
  }
}
```

### Mutation: Actualizar cantidad en carrito

```graphql
mutation UpdateCartItemQuantity($cartItemId: ID!, $quantity: Int!) {
  updateCartItemQuantity(cartItemId: $cartItemId, quantity: $quantity) {
    id
    quantity
  }
}
```

---

## Variables de Entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql
NEXT_PUBLIC_S3_BUCKET=ecommerce-products-bucket
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
```

**Nota**: No commitear este archivo. Agregar a `.gitignore`.

---

## Costos Estimados de AWS

Para una aplicación pequeña-mediana:

- **AppSync**: ~$4 por millón de operaciones
- **DynamoDB**: Free tier: 25GB storage, 25 unidades de lectura/escritura
- **S3**: $0.023 por GB/mes
- **Cognito**: Free tier: 50,000 MAUs

**Estimado mensual**: $10-50 dependiendo del tráfico.

---

## Troubleshooting

### Error: "Unauthorized" en queries

- Verifica que la API key esté activa en AppSync
- O que el usuario esté autenticado si usas Cognito

### Imágenes no cargan desde S3

- Verifica permisos del bucket (CORS configurado)
- Usa URLs firmadas con `Storage.get()`

### DynamoDB Throttling

- Aumenta capacidad de lectura/escritura
- O usa modo on-demand

---

## Próximos Pasos

1. ✅ **Desarrollar frontend con mock data** (COMPLETO)
2. 🔄 **Inicializar Amplify** (Siguiente)
3. 🔄 **Configurar AppSync + DynamoDB**
4. 🔄 **Migrar código de mock a GraphQL**
5. 🔄 **Configurar S3 y subir imágenes**
6. 🔄 **Agregar autenticación con Cognito**
7. 🔄 **Implementar Lambda functions para lógica custom**
8. 🔄 **Deploy a producción**

---

## Recursos Adicionales

- [AWS Amplify Docs](https://docs.amplify.aws/)
- [AppSync GraphQL Directives](https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [Next.js with Amplify](https://docs.amplify.aws/nextjs/)

---

## Contacto y Soporte

Para preguntas sobre esta implementación, consulta la documentación oficial de AWS Amplify o abre un issue en el repositorio del proyecto.
