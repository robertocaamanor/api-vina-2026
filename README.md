# API Viña 2026 (NestJS)

API en **NestJS** con datos estáticos de la **parrilla del Festival de Viña del Mar 2026**. Incluye endpoints para obtener la parrilla completa y filtrar la programación por día, además de documentación interactiva con **Swagger UI**.

> Fecha de referencia: **6 de enero de 2026**

## Contenidos

- [Stack y dependencias](#stack-y-dependencias)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Ejecución](#ejecución)
- [Swagger UI](#swagger-ui)
- [Endpoints](#endpoints)
- [Modelo de datos](#modelo-de-datos)

## Stack y dependencias

- Node.js + TypeScript
- NestJS: `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
- Swagger: `@nestjs/swagger`, `swagger-ui-express`

## Estructura del proyecto

```
src/
  main.ts              # bootstrap + Swagger
  app.module.ts        # módulo raíz
  vina/
    vina.controller.ts # endpoints REST
    vina.service.ts    # lógica + datos (in-memory)
    vina.interfaces.ts # interfaces TS
```

## Ejecución

Instalar dependencias:

```bash
npm install
```

Compilar TypeScript a `dist/`:

```bash
npm run build
```

Levantar la API (modo "dev" con ts-node):

```bash
npm run start:dev
```

Levantar la API desde el build (`dist/`):

```bash
npm run start
```

Por defecto escucha en:

- `http://localhost:3000`

## Swagger UI

La documentación Swagger se expone en:

- Swagger UI: `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/docs-json`

## Autenticación (JWT)

La API está protegida con **JWT**. Para consumir los endpoints debes enviar el header:

`Authorization: Bearer <token>`

### 1) Obtener token

- `POST /auth/login` (público)

Body:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Ejemplo:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin\"}"
```

Respuesta:

```json
{
  "access_token": "<JWT>",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 2) Usar token en la API

Ejemplo (parrilla completa):

```bash
curl http://localhost:3000/festival-vina-2026/parrilla \
  -H "Authorization: Bearer <JWT>"
```

### Variables de entorno

Puedes cambiar el secreto y credenciales por variables de entorno:

- `JWT_SECRET`: secreto para firmar/verificar tokens
- `API_USER`: usuario válido (por defecto `admin`)
- `API_PASSWORD`: password válido (por defecto `admin`)

En Windows PowerShell (ejemplo):

```powershell
$env:JWT_SECRET="cambia_esto";
$env:API_USER="admin";
$env:API_PASSWORD="admin";
npm run start:dev
```

## Endpoints

Base path:

- `/festival-vina-2026`

### 1) Obtener parrilla completa

- `GET /festival-vina-2026/parrilla`

Retorna un objeto con:

- nombre, edición, animadores
- programación por día
- competencia folclórica
- competencia internacional

Ejemplo:

```bash
curl http://localhost:3000/festival-vina-2026/parrilla \
  -H "Authorization: Bearer <JWT>"
```

### 2) Obtener programación por día

- `GET /festival-vina-2026/programacion/:dia`

- `:dia` es un string (por ejemplo `Lunes`, `Martes`, etc.)
- La búsqueda **ignora mayúsculas/minúsculas** (`lunes`, `Lunes`, `LUNES` funcionan igual)

Ejemplos:

```bash
curl http://localhost:3000/festival-vina-2026/programacion/Lunes \
  -H "Authorization: Bearer <JWT>"

curl http://localhost:3000/festival-vina-2026/programacion/lunes \
  -H "Authorization: Bearer <JWT>"
```

Respuesta (ejemplo):

```json
{
  "dia": "Lunes",
  "fecha": "23 de febrero",
  "cantantes": ["Pet Shop Boys", "Bomba Estéreo"],
  "humorista": "Rodrigo Villegas"
}
```

#### Errores

Si el día no existe, retorna **404** con mensaje:

```bash
curl -i http://localhost:3000/festival-vina-2026/programacion/Sabado
```

## Modelo de datos

Las interfaces se encuentran en `src/vina/vina.interfaces.ts`.

- `Competidor`:
  - `pais: string`
  - `artista: string`
  - `cancion: string`

- `ArtistaDia`:
  - `dia: string`
  - `fecha: string`
  - `cantantes: string[]`
  - `humorista: string`

- `ParrillaFestival`:
  - `nombre: string`
  - `edicion: string`
  - `animadores: string[]`
  - `programacion: ArtistaDia[]`
  - `competencia_folclorica: Competidor[]`
  - `competencia_internacional: Competidor[]`

## Datos incluidos (resumen)

- Animadores: Karen Doggenweiler, Rafael Araneda
- Programación (Domingo a Viernes)
- Competencia folclórica (6 países)
- Competencia internacional (6 países)

---

## Ejemplos de respuesta completa

### Respuesta completa: `GET /festival-vina-2026/parrilla`

```json
{
  "nombre": "Festival Internacional de la Canción de Viña del Mar",
  "edicion": "LXV (65ª)",
  "animadores": ["Karen Doggenweiler", "Rafael Araneda"],
  "programacion": [
    {
      "dia": "Domingo",
      "fecha": "22 de febrero",
      "cantantes": ["Gloria Estefan", "Matteo Bocelli"],
      "humorista": "Stefan Kramer"
    },
    {
      "dia": "Lunes",
      "fecha": "23 de febrero",
      "cantantes": ["Pet Shop Boys", "Bomba Estéreo"],
      "humorista": "Rodrigo Villegas"
    },
    {
      "dia": "Martes",
      "fecha": "24 de febrero",
      "cantantes": ["Jesse & Joy", "NMIXX"],
      "humorista": "Esteban Düch"
    },
    {
      "dia": "Miércoles",
      "fecha": "25 de febrero",
      "cantantes": ["Juanes", "Ke Personajes"],
      "humorista": "Asskha Sumathra"
    },
    {
      "dia": "Jueves",
      "fecha": "26 de febrero",
      "cantantes": ["Mon Laferte", "Yandel Sinfónico"],
      "humorista": "Piare con Pe"
    },
    {
      "dia": "Viernes",
      "fecha": "27 de febrero",
      "cantantes": ["Paulo Londra", "Pablo Chill-E", "Milo J"],
      "humorista": "Pastor Rocha"
    }
  ],
  "competencia_folclorica": [
    { "pais": "Argentina", "artista": "Campedrinos", "cancion": "La Zamba" },
    { "pais": "Chile", "artista": "A Los 4 Vientos", "cancion": "Valoración" },
    { "pais": "Colombia", "artista": "Rebolú", "cancion": "Los Herederos" },
    { "pais": "Ecuador", "artista": "Brenda", "cancion": "Capullito" },
    { "pais": "México", "artista": "Majo Cornejo", "cancion": "Ningún Color Tiene Dueño" },
    { "pais": "España", "artista": "María Peláe", "cancion": "Que Vengan A Por Mi" }
  ],
  "competencia_internacional": [
    { "pais": "Estonia", "artista": "Vanilla Ninja", "cancion": "Ready To Go" },
    { "pais": "España", "artista": "Antoñito Molina", "cancion": "Me Prometo" },
    { "pais": "Italia", "artista": "Chiara Grispo", "cancion": "Grazie A(d)dio" },
    { "pais": "Chile", "artista": "Son Del Valle", "cancion": "El Ciclo" },
    { "pais": "República Dominicana", "artista": "Johnny Sky", "cancion": "Call On Me" },
    { "pais": "México", "artista": "Trex", "cancion": "La Ruta Correcta" }
  ]
}
```

### Respuesta completa de error (ejemplo): `GET /festival-vina-2026/programacion/Sabado`

La API responde con **404** cuando el día no existe.

```json
{
  "message": "No se encontró programación para el día: Sabado",
  "error": "Not Found",
  "statusCode": 404
}
```