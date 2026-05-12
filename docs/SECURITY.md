# Security — Redime-WEB

## Autenticación (JWT)
- Todos los endpoints `/api/*` requieren token JWT de Firebase Auth
- El token se envía como `Authorization: Bearer <token>`
- El backend verifica el token con Firebase Admin SDK usando `firebase.json`

## Rate Limiting
| Endpoint | Límite | Ventana |
|----------|--------|---------|
| POST /api/upload | 20 req | 15 min |
| GET /api/* | 100 req | 15 min |
| Auth (login) | 5 req | 15 min |

## Cifrado GPG
- Todo request POST/PUT/PATCH debe enviarse como `{ "encrypted": "<gpg-armored-message>" }`
- El frontend cifra con la llave pública del backend (obtenida de `/api/public-key`)
- El backend descifra con su llave privada (en `keys/private.key`)
- La respuesta se cifra con la llave pública del frontend (generada por sesión)
- Las llaves GPG se generan automáticamente al iniciar el servidor

## CORS
- Solo orígenes permitidos: configurados vía `FRONTEND_URL`
- En desarrollo: localhost:5173, localhost:4173, localhost:5500
