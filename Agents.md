# Agents.md — Guía de Arquitectura del Proyecto

> Este archivo es la fuente de verdad para cualquier desarrollador o agente IA que trabaje en el proyecto.
> Antes de escribir o modificar cualquier código, este documento debe ser leído completo.

---

## 1. Estructura General del Proyecto

```
redime-web/
├── frontend/                   # Aplicación React
│   └── src/
│       ├── features/           # Funcionalidades por dominio
│       ├── components/         # Componentes UI compartidos (globales)
│       ├── hooks/              # Custom hooks verdaderamente globales
│       ├── stores/             # Estado global (ej: Zustand, Context raíz)
│       ├── services/           # httpClient base (instancia Axios, interceptores)
│       ├── utils/              # Utilidades puras (crypto, format, etc.)
│       ├── assets/             # Imágenes, fuentes, icons
│       ├── styles/             # CSS global y variables
│       ├── App.js
│       └── index.js
│
├── backend/                    # API Server (Node.js + Express)
│   └── src/
│       ├── features/           # Funcionalidades por dominio
│       ├── middleware/         # Middleware global (auth, rateLimit, cors)
│       ├── shared/             # Utilidades compartidas entre features
│       ├── config/             # Configuración (env, DB, GPG)
│       └── index.js            # Entry point del servidor
│
├── docs/
│   ├── API.md
│   ├── SECURITY.md
│   └── DEPLOY.md
├── .env                        # Variables de entorno (NO subir a git)
├── .env.example                # Plantilla de variables
├── .gitignore
└── README.md
```

---

## 2. Estructura Interna de Features

### 2.1 Frontend — `frontend/src/features/<nombre-feature>/`

Cada feature del frontend implementa **MVVM (Model-View-ViewModel)** de forma explícita
a través de su estructura de carpetas. La separación no es opcional: hace que la
arquitectura sea autoevidente para cualquier desarrollador o agente que se incorpore.

```
features/<nombre-feature>/
├── views/                      # VIEW: Pantallas completas que el router renderiza
│   └── FeatureView.js          # Solo JSX + delega eventos al ViewModel
├── components/                 # Sub-componentes privados de este feature
│   ├── FeatureForm.js          # Reciben todo por props, sin lógica de negocio
│   └── FeatureResults.js
├── viewmodels/                 # VIEWMODEL: Lógica de UI y transformación de datos
│   └── useFeatureViewModel.js  # Hook que conecta el Model con la View
├── services/                   # MODEL: Llamadas API con httpClient + cifrado GPG
│   └── featureService.js
└── index.js                    # API pública del feature (barrel export)
```

**Regla fundamental de encapsulación:** el `index.js` de cada feature es su única
interfaz pública. Solo se exporta desde ahí lo que otros módulos necesitan ver
(normalmente solo la View principal). Ningún archivo externo debe importar desde
rutas internas como `features/auth/viewmodels/useAuthViewModel.js` — siempre se
importa desde `features/auth/`.

**Ejemplo de `index.js`:**
```javascript
// features/auth/index.js — solo se expone lo necesario hacia afuera
export { LoginView } from './views/LoginView';
// useAuthViewModel y authService son detalles de implementación: NO se exportan
```

### 2.2 Backend — `backend/src/features/<nombre-feature>/`

```
features/<nombre-feature>/
├── routes/                     # Definición de endpoints y middleware aplicado
│   └── <feature>.routes.js
├── controllers/                # Recibe req/res, valida input, llama al service
│   └── <feature>.controller.js
├── services/                   # Lógica de negocio + cifrado GPG
│   └── <feature>.service.js
├── repositories/               # Queries a la base de datos
│   └── <feature>.repository.js
└── models/                     # Esquemas y validaciones de datos
    └── <Feature>Model.js
```

---

## 3. Seguridad — Flujo GPG

Todo el tráfico entre frontend y backend debe pasar por el flujo de cifrado GPG.
Ningún endpoint puede recibir o enviar datos sensibles en texto plano.

```
┌─────────────────────────────────────────────────────────────────┐
│  FLUJO DE SEGURIDAD                                             │
│                                                                  │
│  Frontend → Cifra request con clave PÚBLICA → Backend          │
│  Backend  → Valida/Descifra con clave PRIVADA → Procesa        │
│  Backend  → Cifra response con clave PÚBLICA → Frontend        │
│  Frontend → Descifra con clave PRIVADA (en memoria)            │
└─────────────────────────────────────────────────────────────────┘
```

**Restricción absoluta:** la clave GPG privada del backend nunca debe estar en
el código fuente ni en variables de entorno del frontend. La clave privada del
frontend se mantiene exclusivamente en memoria durante la sesión.

---

## 4. Rate Limiting

### 4.1 Límites por Tipo de Endpoint

| Tipo de Endpoint | Límite   | Ventana |
|------------------|----------|---------|
| GET (lectura)    | 100 req  | 15 min  |
| POST (escritura) | 20 req   | 15 min  |
| Auth (login)     | 5 req    | 15 min  |
| API Consultas    | 50 req   | 15 min  |

### 4.2 Implementación del Middleware

El rate limiting se aplica en `backend/src/middleware/` y debe registrarse en
el router antes que cualquier lógica de controlador. Cada tipo de endpoint
importa su configuración correspondiente desde `config/rateLimit.js`.

---

## 5. Responsabilidades por Capa

### 5.1 Frontend (MVVM)

| Capa                        | Responsabilidad                                                       | Prohibido                                      |
|-----------------------------|-----------------------------------------------------------------------|------------------------------------------------|
| **View** (`views/`)         | Renderizar la pantalla completa, capturar eventos del usuario         | Lógica de negocio, llamadas API, estado propio |
| **Components** (`components/`) | Piezas reutilizables de UI dentro del feature, todo llega por props | Lógica de negocio, acceso a servicios          |
| **ViewModel** (`viewmodels/`) | Estado local de UI, transformar datos del Model para la View        | Llamadas HTTP directas, manipular datos sin cifrar |
| **Model / Services** (`services/`) | Llamar la API usando httpClient + cifrado GPG             | Manipular estado de UI, lógica de presentación |
| **Utils**                   | Funciones puras (crypto, format, validaciones)                        | Efectos secundarios, llamadas de red           |

> La regla de oro del MVVM es que la **View no sabe de dónde vienen los datos**,
> solo sabe cómo mostrarlos. El **ViewModel** hace la traducción entre los datos
> crudos del service y lo que la View necesita para renderizar. Si te preguntas
> si algo va en la View o en el ViewModel, la respuesta es casi siempre: ViewModel.

### 5.2 Backend

| Capa             | Responsabilidad                              | Prohibido                         |
|------------------|----------------------------------------------|-----------------------------------|
| **Routes**       | Definir endpoints y aplicar middleware        | Lógica de negocio                 |
| **Controllers**  | Validar input, llamar services, formar response | Acceso directo a BD            |
| **Services**     | Lógica de negocio, cifrado GPG               | Acceso directo a BD               |
| **Repositories** | Queries a la base de datos                   | Lógica de negocio                 |
| **Models**       | Esquemas y validaciones de datos             | Llamadas de red                   |
| **Middleware**   | Auth, rate limit, logging, CORS              | Modificar datos de negocio        |

---

## 6. Comunicación entre Módulos

### 6.1 Frontend: Comunicación entre Features

| Necesidad                          | Mecanismo correcto                                  |
|------------------------------------|-----------------------------------------------------|
| View → ViewModel (mismo feature)   | El ViewModel se pasa como hook al componente View   |
| Componente → sub-componente        | Props                                               |
| Feature → Feature                  | Store global o custom hooks compartidos en `hooks/` |
| Servicio → Servicio                | httpClient compartido en `services/`                |

### 6.2 Backend: Comunicación entre Features

| Necesidad                       | Mecanismo correcto                          |
|---------------------------------|---------------------------------------------|
| Controller → Service            | Importación directa (mismo feature)         |
| Feature → Feature               | Services compartidos en `shared/`           |
| Service → BD                    | Repository del mismo feature                |

### 6.3 Prohibiciones absolutas de comunicación

- El frontend nunca llama directamente a repositories o models del backend.
- El backend nunca expone endpoints sin middleware de seguridad aplicado.
- Las claves privadas GPG nunca viajan por la red ni se escriben en código fuente.
- Dos features del frontend no se importan entre sí sus archivos internos: solo
  se comunican a través de sus respectivos `index.js` o mediante el store global.

---

## 7. Reglas de Nombrado

### 7.1 Archivos

| Tipo                | Convención            | Ejemplo                                |
|---------------------|-----------------------|----------------------------------------|
| Views (MVVM)        | PascalCase + View     | `LoginView.js`, `DashboardView.js`     |
| Componentes React   | PascalCase            | `HamburgerMenu.js`, `ApiForm.js`       |
| ViewModels          | camelCase + ViewModel | `useAuthViewModel.js`                  |
| Hooks globales      | camelCase + use       | `useWindowSize.js`, `useDebounce.js`   |
| Services            | camelCase + Service   | `apiService.js`, `authService.js`      |
| Controllers         | camelCase + Controller | `apiController.js`                    |
| Routes              | camelCase + Routes    | `apiRoutes.js`                         |
| Middleware          | camelCase + Middleware | `rateLimitMiddleware.js`              |
| Models              | PascalCase + Model    | `UserModel.js`, `QueryModel.js`        |
| Repositories        | camelCase + Repository | `userRepository.js`                   |
| CSS                 | kebab-case            | `main.css`, `api-form.css`             |
| Assets              | kebab-case            | `logo.png`, `user-icon.svg`            |

### 7.2 Variables y Constantes

```javascript
// Variables y funciones: camelCase
const userSession = getActiveSession();

// Constantes de configuración: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Clases y constructores: PascalCase
class EncryptionService {}

// Métodos privados (convención): prefijo _
_validateInternalState() {}

// Booleanos: prefijo is/has/can
const isAuthenticated = true;
const hasPermission = false;
```

### 7.3 Eventos y Endpoints

```javascript
// Handlers de eventos en frontend: prefijo handle
const handleFormSubmit = () => {};
const handleInputChange = () => {};

// Endpoints REST: kebab-case, plural para recursos
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/user-sessions       // recursos compuestos: kebab-case
```

---

## 8. Reglas para Agentes IA

### 8.1 Antes de Generar Código

Antes de escribir cualquier línea, el agente debe leer este archivo completo,
identificar en qué feature y en qué capa corresponde el cambio, verificar si
existe código similar que pueda reutilizarse, y confirmar que la estructura de
carpetas destino ya existe o crearla según las convenciones definidas aquí.

### 8.2 Restricciones Absolutas

| Restricción                                        | Razón                                        |
|----------------------------------------------------|----------------------------------------------|
| No usar TypeScript                                 | Proyecto en JavaScript puro                  |
| No exponer clave GPG privada en frontend           | Seguridad crítica                            |
| No usar `fetch` directo                            | Siempre usar `httpClient` con interceptores  |
| No saltar middleware de seguridad                  | Todos los endpoints deben estar protegidos   |
| No hardcodear valores sensibles                    | Usar variables de entorno                    |
| No mezclar frontend y backend en el mismo archivo  | Separación clara de responsabilidades        |
| No importar archivos internos de otro feature      | Solo importar desde `index.js` del feature   |
| No poner lógica de negocio en una View             | Pertenece al ViewModel o al Service          |

### 8.3 Al Agregar Nueva Funcionalidad

Al crear un nuevo feature, el agente debe crear la estructura completa en
`frontend/src/features/<feature>/` con las carpetas `views/`, `components/`,
`viewmodels/` y `services/`, más su `index.js`. Paralelamente debe crear la
estructura en `backend/src/features/<feature>/` con `routes/`, `controllers/`,
`services/`, `repositories/` y `models/`. Luego debe registrar la ruta en el
router del backend, aplicar el middleware de seguridad correspondiente, y
documentar los endpoints nuevos en `docs/API.md`.

### 8.4 Al Modificar Código Existente

El agente debe mantener la firma de los métodos públicos para no romper contratos
con otros módulos. Los métodos con prefijo `_` son privados y no deben llamarse
desde fuera de su clase o módulo. Si cambia el comportamiento de una función,
debe actualizar su JSDoc. Cualquier modificación debe verificar que no debilite
el flujo de seguridad GPG existente.

### 8.5 Calidad de Código

| Regla      | Detalle                                                              |
|------------|----------------------------------------------------------------------|
| JSDoc      | Cada función/método debe tener `@param` y `@returns`                 |
| Longitud   | Funciones máx 40 líneas; extraer subfunciones si se excede           |
| Nombres    | Variables descriptivas — evitar `data`, `obj`, `temp`, `res`        |
| Async      | Preferir `async/await` sobre `.then()/.catch()`                      |
| Variables  | Preferir `const` sobre `let`. Nunca usar `var`                       |

---

## 9. Checklist de Nuevo Módulo/Feature

### Frontend
- [ ] Carpeta `views/` creada con el archivo `FeatureView.js`
- [ ] Carpeta `viewmodels/` creada con `useFeatureViewModel.js`
- [ ] Carpeta `components/` creada con sub-componentes necesarios
- [ ] Carpeta `services/` creada con llamadas API usando `httpClient` + GPG
- [ ] `index.js` creado exportando solo lo público del feature
- [ ] Feature registrada en el router de la aplicación
- [ ] Sin lógica de negocio en la View

### Backend
- [ ] Ruta definida en `<feature>.routes.js` con middleware de seguridad
- [ ] Controller creado que valida input y delega al service
- [ ] Service creado con la lógica de negocio
- [ ] Repository creado para acceso a BD
- [ ] Model/Schema creado para validaciones
- [ ] Ruta registrada en `backend/src/index.js` o en el router central
- [ ] Rate limiting configurado según el tipo de endpoint

### Seguridad
- [ ] Todos los endpoints tienen middleware de autenticación
- [ ] Rate limiting aplicado según la tabla de la sección 4
- [ ] Requests cifrados con GPG en el frontend antes de enviar
- [ ] Responses descifradas solo en memoria en el frontend
- [ ] Sin claves privadas en código fuente ni en variables del frontend
- [ ] Sin datos sensibles en texto plano en logs
- [ ] Variables de entorno documentadas en `.env.example`

---

## 10. Flujo de Datos Completo

```
[Usuario]
    │
    ▼
[View — FeatureView.js]           ← Solo renderiza, captura eventos
    │ llama hook
    ▼
[ViewModel — useFeatureViewModel] ← Transforma datos, maneja estado UI
    │ llama service
    ▼
[Service — featureService.js]     ← Cifra con GPG, llama httpClient
    │ HTTP + GPG
    ▼
[Middleware: auth + rateLimit]    ← Valida token, aplica límites
    │
    ▼
[Controller]                      ← Valida input, coordina
    │
    ▼
[Service (backend)]               ← Lógica de negocio, descifra GPG
    │
    ▼
[Repository]                      ← Query a la BD
    │
    ▼
[Base de Datos]
    │
    ▼ (respuesta sube por el mismo camino, cifrada de vuelta)
[View — se actualiza con nuevos datos]
```

---

## 11. Incorporar un Nuevo Equipo

Cuando un nuevo equipo se une al proyecto debe seguir estos pasos en orden.
Primero leer este archivo (`Agents.md`) completo antes de escribir cualquier
código. Luego crear su feature en `frontend/src/features/<nuevo-feature>/` y en
`backend/src/features/<nuevo-feature>/` siguiendo exactamente las estructuras
de la sección 2. Revisar la sección 6 para entender cómo comunicarse con otros
features sin romper el encapsulamiento. Registrar sus endpoints en el router del
backend y configurar el middleware de seguridad para todos ellos. Finalmente,
no modificar `shared/`, `config/`, ni ningún middleware global sin aprobación
del equipo responsable, ya que esos cambios afectan a todos los features.

---

## 13. Recursos y Documentación

| Recurso             | Ubicación          |
|---------------------|--------------------|
| API Documentation   | `/docs/API.md`     |
| Security Guidelines | `/docs/SECURITY.md`|
| Deployment Guide    | `/docs/DEPLOY.md`  |
| Environment Setup   | `/README.md`       |

---

*Última actualización: Marzo 2026*
*Versión: 2.0 — Arquitectura Monolítica Modular + MVVM Explícito + Seguridad GPG*
