# Deploy — Redime-WEB en Hostinger

## Requisitos
- Plan Hostinger con Node.js (Business, Cloud o VPS)
- Node.js 22+ en el servidor
- Cuenta de Firebase con Firestore + Auth habilitados

## Pasos

### 1. Construir frontend
```bash
npm run build   # genera dist/
```

### 2. Subir archivos al servidor
Subir por FTP/Git:
- `server.js`
- `package.json` + `package-lock.json`
- `dist/` (frontend compilado)
- `imgs-db/` (directorio de imágenes)
- `backend/` (capa de backend)
- `middleware/` (middleware de seguridad)
- `.env` (variables de producción)
- `firebase.json` (service account key,
.    **nunca** subir a repos públicos)

Luego en el servidor:
```bash
npm install --production
```

### 3. Configurar en cPanel (Setup Node.js App)
| Campo | Valor |
|-------|-------|
| Application mode | `Production` |
| Application root | `/ruta/a/redime-web` |
| Entry point | `server.js` |
| Environment | Cargar desde `.env` |

### 4. Variables de entorno (.env)
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tudominio.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
GOOGLE_APPLICATION_CREDENTIALS=firebase.json
```

### 5. Iniciar
Dar a "Run" en cPanel. La primera vez generará las llaves GPG en `keys/`.

### Dev (local)
```bash
npm run dev:all    # Vite + servidor Node simultáneamente
```
