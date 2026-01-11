# 📱 Implementación del Flujo de WhatsApp

Este documento describe la implementación completa del flujo de checkout vía WhatsApp para el e-commerce.

## 📋 Resumen de Cambios

### ✅ Completado

1. **Schema GraphQL Optimizado** ([docs/graphql/schema.graphql](docs/graphql/schema.graphql))
   - ❌ Eliminado: `Cart`, `CartItem`, `User` (no hay autenticación)
   - ✅ Mantenido: `Product`, `ProductVariant`, `Category` (catálogo público)
   - ✅ Agregado: `WhatsAppInquiry` (analytics opcional)
   - ✅ Simplificado: Auth rules solo `public` + `iam` (sin Cognito)

2. **CartStore Mejorado** ([lib/store/cartStore.ts](lib/store/cartStore.ts))
   - ✅ `generateWhatsAppMessage()`: Genera mensaje formateado para WhatsApp
   - ✅ `generateWhatsAppUrl()`: Crea URL de WhatsApp con mensaje prellenado
   - ✅ `getAnalyticsData()`: Prepara datos para AppSync (uso futuro)
   - ✅ Session ID persistente en localStorage

3. **Componente WhatsAppCheckout** ([components/cart/WhatsAppCheckout.tsx](components/cart/WhatsAppCheckout.tsx))
   - ✅ Input opcional de nombre del cliente
   - ✅ Vista previa del mensaje antes de enviar
   - ✅ Botón de WhatsApp con icono y loading state
   - ✅ Limpieza automática del carrito después de enviar

4. **Página de Carrito Actualizada** ([app/cart/page.tsx](app/cart/page.tsx))
   - ✅ Integrado componente `WhatsAppCheckout`
   - ✅ Eliminadas funciones obsoletas (`handleCheckout`, imports innecesarios)
   - ✅ UI mejorada con resumen y checkout separados

---

## 🎯 Flujo de Usuario Completo

### 1. Navegación y Selección
```
Usuario → Explorar productos → Seleccionar variante → Agregar al carrito
```

### 2. Revisión del Carrito
```
Usuario → /cart → Ver resumen → Modificar cantidades → (Opcional) Agregar nombre
```

### 3. Checkout por WhatsApp
```
Click "Enviar pedido por WhatsApp" →
  1. Se genera mensaje formateado
  2. Se abre WhatsApp en nueva pestaña
  3. Usuario ve mensaje prellenado
  4. Usuario puede modificar y enviar
  5. Carrito se limpia automáticamente (después de 2s)
```

### 4. Ejemplo de Mensaje Generado

```
Mi nombre es Juan Pérez

🛒 ¡Hola! Me interesan estos productos:

1. iPhone 15 Pro Max - Titanio Natural - 256GB
   📦 Cantidad: 2
   💵 Precio: $1199.99
   💰 Subtotal: $2399.98

2. AirPods Pro 2da Gen con USB-C
   📦 Cantidad: 1
   💵 Precio: $249.99
   💰 Subtotal: $249.99

🎉 Ahorro total: $200.00
💰 TOTAL: $2649.97

¿Podrían darme más información y ayudarme con la compra?
```

---

## 🏗️ Arquitectura del Sistema

### Frontend (Next.js)
```
┌─────────────────────────────────────┐
│  Components                         │
│  - WhatsAppCheckout                 │
│  - ProductCard                      │
│  - VariantSelector                  │
└───────────┬─────────────────────────┘
            │
            ↓
┌─────────────────────────────────────┐
│  State Management (Zustand)         │
│  - cartStore                        │
│    • items (localStorage)           │
│    • generateWhatsAppMessage()      │
│    • generateWhatsAppUrl()          │
└───────────┬─────────────────────────┘
            │
            ↓
┌─────────────────────────────────────┐
│  Mock Data (lib/mock)               │
│  - products.ts                      │
│  - categories.ts                    │
└─────────────────────────────────────┘
```

### Backend Futuro (AWS AppSync)
```
┌─────────────────────────────────────┐
│  AWS AppSync (GraphQL API)          │
│  - Public API Key (productos)       │
│  - IAM Auth (CMS)                   │
└───────────┬─────────────────────────┘
            │
            ├──────────────┬──────────┐
            ↓              ↓          ↓
    ┌──────────┐   ┌──────────┐  ┌─────────┐
    │ DynamoDB │   │ DynamoDB │  │ DynamoDB│
    │ Product  │   │ Category │  │WhatsApp │
    │          │   │          │  │ Inquiry │
    └──────────┘   └──────────┘  └─────────┘
```

---

## 📊 Comparación: Antes vs Después

### Tablas DynamoDB
| Antes | Después | Cambio |
|-------|---------|--------|
| Product ✅ | Product ✅ | Mantenido |
| ProductVariant ✅ | ProductVariant ✅ | Mantenido |
| Category ✅ | Category ✅ | Mantenido |
| Cart ❌ | - | **Eliminado** |
| CartItem ❌ | - | **Eliminado** |
| User ❌ | - | **Eliminado** |
| - | WhatsAppInquiry ✅ | **Nuevo** |

### Costos Estimados (10K productos, 1K usuarios/mes)
| Servicio | Antes | Después | Ahorro |
|----------|-------|---------|--------|
| DynamoDB | $0.50 | $0.10 | -80% |
| AppSync | $4.00 | $2.00 | -50% |
| Lambda | $2.00 | $0.50 | -75% |
| Cognito | $0.00 | - | - |
| **TOTAL** | **$6.50** | **$2.60** | **-60%** |

### Complejidad del Schema
| Métrica | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| Tipos @model | 6 | 4 | -33% |
| Índices GSI | 7 | 5 | -28% |
| Mutations custom | 3 | 2 | -33% |
| Auth rules | Complejo | Simple | -70% |

---

## 🚀 Cómo Usar

### Para Desarrollo Local

1. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

2. **Agregar productos al carrito**
   - Navega a http://localhost:3000
   - Explora productos
   - Agrega al carrito

3. **Probar checkout WhatsApp**
   - Ve a http://localhost:3000/cart
   - (Opcional) Agrega tu nombre
   - Click en "Enviar pedido por WhatsApp"
   - Verifica que WhatsApp se abre con el mensaje correcto

### Variables de Entorno

Crear archivo `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
```

**Formato del número:**
- Código de país (sin +): `52` (México)
- Número completo: `5215512345678`
- ❌ NO incluir espacios, guiones o paréntesis

---

## 🔧 Configuración Futura con AWS

### Fase 1: Setup Básico (Solo Catálogo)
```bash
# 1. Instalar Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configurar Amplify
amplify configure

# 3. Inicializar proyecto
amplify init

# 4. Agregar API GraphQL
amplify add api
# Seleccionar: GraphQL
# Schema: docs/graphql/schema.graphql

# 5. Deploy
amplify push
```

### Fase 2: Analytics (Opcional)
Si quieres trackear consultas de WhatsApp:

1. **Instalar dependencias**
   ```bash
   npm install aws-amplify
   ```

2. **Configurar en `app/layout.tsx`**
   ```typescript
   import { Amplify } from 'aws-amplify';
   import amplifyconfig from '../amplifyconfiguration.json';

   Amplify.configure(amplifyconfig);
   ```

3. **Agregar tracking en `cartStore.ts`**
   ```typescript
   import { generateClient } from 'aws-amplify/api';

   // En generateWhatsAppUrl():
   const client = generateClient();
   await client.graphql({
     mutation: createWhatsAppInquiry,
     variables: { input: getAnalyticsData() }
   });
   ```

---

## 📝 Archivos Modificados

### Nuevos Archivos
- ✅ `components/cart/WhatsAppCheckout.tsx` - Componente de checkout
- ✅ `WHATSAPP_IMPLEMENTATION.md` - Esta documentación

### Archivos Modificados
- ✅ `docs/graphql/schema.graphql` - Schema simplificado para WhatsApp
- ✅ `lib/store/cartStore.ts` - Agregadas funciones de WhatsApp
- ✅ `app/cart/page.tsx` - Integrado WhatsAppCheckout
- ✅ `components/product/VariantSelector.tsx` - Fix de TypeScript

### Archivos Eliminados/Deprecados
- ⚠️ `lib/utils/format.ts`: Las funciones `generateCartWhatsAppMessage()` y `formatWhatsAppUrl()` ya no se usan (reemplazadas por métodos en cartStore)

---

## ✅ Testing Checklist

### Funcionalidad Básica
- [ ] Los productos se muestran correctamente
- [ ] Se pueden agregar productos al carrito
- [ ] El carrito persiste al refrescar la página
- [ ] Se pueden modificar cantidades
- [ ] Se pueden eliminar productos
- [ ] Se puede vaciar el carrito

### Flujo WhatsApp
- [ ] El mensaje se genera correctamente
- [ ] Las variantes se muestran en el mensaje
- [ ] Los precios se formatean bien (con decimales)
- [ ] El descuento total se calcula correctamente
- [ ] El nombre del cliente aparece si se ingresó
- [ ] WhatsApp se abre en una nueva pestaña
- [ ] El carrito se limpia después de enviar
- [ ] La vista previa del mensaje funciona

### Casos Edge
- [ ] Carrito vacío no permite checkout
- [ ] Productos sin variante funcionan correctamente
- [ ] Productos con múltiples variantes se manejan bien
- [ ] Caracteres especiales en nombres se encodean bien
- [ ] Números de WhatsApp con diferentes formatos funcionan

---

## 🐛 Troubleshooting

### WhatsApp no se abre
**Problema**: Al hacer click, no pasa nada
**Solución**:
1. Verificar que `NEXT_PUBLIC_WHATSAPP_NUMBER` esté configurado
2. Revisar consola del navegador por errores
3. Verificar que el navegador permite pop-ups

### Mensaje aparece mal formateado
**Problema**: El mensaje en WhatsApp se ve sin formato
**Solución**:
- WhatsApp Web/Desktop preserva el formato Markdown
- WhatsApp Mobile puede mostrar diferente
- Los asteriscos `*texto*` hacen el texto **negrita**

### Carrito no se limpia
**Problema**: Después de enviar, los productos siguen en el carrito
**Solución**:
- El timeout es de 2 segundos (dar tiempo a que se abra WhatsApp)
- Si se cierra rápido, ajustar timeout en `WhatsAppCheckout.tsx` línea 27

### Build falla
**Problema**: `npm run build` muestra errores
**Solución**:
```bash
# Limpiar cache
rm -rf .next node_modules

# Reinstalar
npm install

# Build
npm run build
```

---

## 📚 Recursos Adicionales

### Documentación
- [Next.js App Router](https://nextjs.org/docs/app)
- [Zustand](https://github.com/pmndrs/zustand)
- [WhatsApp API](https://faq.whatsapp.com/5913398998672934)
- [AWS Amplify](https://docs.amplify.aws/)
- [AppSync GraphQL](https://docs.aws.amazon.com/appsync/)

### Herramientas Útiles
- [WhatsApp Link Generator](https://wa.me/) - Para probar URLs
- [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) - Para testing de queries
- [DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) - Para desarrollo local

---

## 🎉 Resumen Final

### Lo que funciona ahora (con datos mock):
✅ Catálogo de productos completo
✅ Búsqueda y filtros
✅ Carrito con localStorage
✅ Generación de mensaje WhatsApp
✅ Checkout vía WhatsApp
✅ Vista previa de mensaje
✅ Limpieza automática del carrito

### Lo que se agregará con AWS (futuro):
🔜 Persistencia en DynamoDB
🔜 CMS para gestionar productos
🔜 Analytics de consultas WhatsApp
🔜 Tracking de conversiones
🔜 Actualización de inventario en tiempo real
🔜 Dashboard de métricas

---

**Última actualización**: 2026-01-11
**Versión**: 2.0.0 (WhatsApp Flow)
