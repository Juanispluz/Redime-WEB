# API — Redime-WEB

## Endpoints

### `GET /api/public-key`
Obtiene la llave pública GPG del servidor para cifrar requests.

**Response:**
```json
{ "publicKey": "-----BEGIN PGP PUBLIC KEY BLOCK-----..." }
```

### `POST /api/upload`
Sube una imagen cifrada con GPG.

**Headers:**
- `Authorization: Bearer <firebase-id-token>` (requerido)
- `Content-Type: application/json`

**Body (cifrado con GPG):**
```json
{
  "image": "data:image/webp;base64,...",
  "filename": "publicacionId.webp",
  "path": "imgs-db/publicaciones/DD-MM-YYYY"
}
```

**Response (cifrado con GPG):**
```json
{ "url": "/imgs-db/publicaciones/DD-MM-YYYY/id.webp", "success": true }
```

### Flujo de seguridad
1. Frontend solicita llave pública a `GET /api/public-key`
2. Frontend genera su propio par de llaves ECC (sesión)
3. Frontend cifra el payload con la llave pública del backend
4. Backend descifra con su llave privada, procesa la petición
5. Backend cifra la respuesta con la llave pública del frontend
6. Frontend descifra la respuesta con su llave privada
