# Frontend — Sistema de Reservas de Talleres

Aplicación en React que consume el backend NestJS: inicio de sesión, catálogo de talleres, reserva de cupos y listado de reservas propias.

## Decisiones de dependencias

### Runtime y gestor de paquetes

| Pieza | Versión | Por qué |
|---|---|---|
| **Node.js** | **20.x** | Versión LTS estable con soporte extendido y compatibilidad probada con Vite 7, React 19 y Tailwind CSS 4. |
| **npm** | **10.x** | Viene con Node 20; no requiere configuración adicional. |

### Librería UI y bundler

| Paquete | Versión | Por qué |
|---|---|---|
| **React** / **React DOM** | **19.2.1** | React 19.3 se liberó en septiembre de 2026; la rama 19.2 es la versión “penúltima” parchada por seguridad y con un año de uso en producción. |
| **Vite** | **7.3.6** | Vite 8 (marzo de 2026) migró su bundler interno a Rolldown, un cambio de motor muy reciente. La rama 7.x es la versión inmediatamente anterior, estable y recomendada como reemplazo de Create React App. |
| **@vitejs/plugin-react** | **4.3.1** | Plugin oficial de React compatible con Vite 7. |

### Lenguaje y estilos

| Paquete | Versión | Por qué |
|---|---|---|
| **TypeScript** | **5.6.3** | Versión estable compatible con Vite 7, React 19 y el modo `verbatimModuleSyntax` usado en el proyecto. |
| **Tailwind CSS** | **4.3.3** | Versión con configuración “CSS-first” (`@theme` dentro del CSS, sin `tailwind.config.js`) y plugin oficial `@tailwindcss/vite`. |
| **@tailwindcss/vite** | **4.3.3** | Plugin oficial de Vite para Tailwind CSS 4. |

### Enrutamiento, datos y utilidades

| Paquete | Versión | Por qué |
|---|---|---|
| **react-router-dom** | **7.18.3** | Router declarativo para las rutas `/login`, `/workshops` y la ruta protegida. |
| **@tanstack/react-query** | **5.102.8** | Maneja estados de carga, vacío y error de forma declarativa, además de invalidar la caché tras una reserva exitosa. |
| **lucide-react** | **0.503.0** | Iconos consistentes con un stack React moderno. |

### Pruebas

| Paquete | Versión | Por qué |
|---|---|---|
| **Vitest** | **4.1.11** | Test runner nativo para Vite; compatible con Jest-like APIs y mocks. |
| **jsdom** | **29.1.1** | Entorno DOM para ejecutar tests de componentes sin navegador. |
| **@testing-library/react** | **16.3.3** | Utilidades para renderizar componentes React en tests. |
| **@testing-library/jest-dom** | **6.9.1** | Matchers adicionales para assertions más expresivas. |
| **@testing-library/user-event** | **14.6.7** | Simulación de interacciones de usuario. |

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores reales:

```bash
cp .env.example .env
```

```bash
VITE_API_BASE_URL="http://localhost:3000/api"
```

## Comandos útiles

```bash
# Instalar dependencias
npm install

# Levantar en desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar el build de producción localmente
npm run preview

# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas en modo watch
npm run test:watch
```

## Arquitectura

El proyecto combina **Clean Architecture** organizada por capas y **Atomic Design** para los componentes de UI:

- `src/shared/` — preocupaciones transversales: cliente HTTP, contexto de autenticación, router, cliente de TanStack Query y componentes UI reutilizables.
- `src/modules/<dominio>/` — cada módulo está dividido en cuatro capas:
  - `domain/` — modelos y reglas de negocio puras.
  - `application/` — casos de uso que orquestan la lógica de aplicación.
  - `infrastructure/` — implementaciones concretas como llamadas HTTP.
  - `presentation/` — view-models y componentes visuales organizados por Atomic Design (`atoms`, `molecules`, `organisms`, `pages`).

Los componentes nunca llaman a `fetch` directamente; consumen view-models, que orquestan use-cases, que llaman a services.

## Pruebas

El proyecto incluye pruebas unitarias sencillas distribuidas en las capas donde tiene sentido:

- `application/usecases/` — se verifica que los casos de uso deleguen correctamente en los servicios.
- `infrastructure/services/` — se verifican las URLs, métodos HTTP y manejo de respuestas.
- `presentation/viewmodels/` — se verifican estados de carga, error y apertura de modales.
- `presentation/components/` y `shared/components/` — se verifica el renderizado, estados disabled/loading y eventos de interacción.

Los modelos de dominio son interfaces puras sin lógica, por lo que no requieren pruebas unitarias.

## Autenticación

El token de acceso JWT vive solo en memoria de React a través de `AuthContext`. Recargar la página cierra la sesión. Esto es intencional: evita que el token sea accesible vía XSS a través de `localStorage`.

## Notas

- El backend debe estar corriendo en `VITE_API_BASE_URL`.
- CORS ya está configurado en el backend para `http://localhost:5173` por defecto.
