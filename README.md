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
curl http://localhost:3000/festival-vina-2026/parrilla
```

### 2) Obtener programación por día

- `GET /festival-vina-2026/programacion/:dia`

- `:dia` es un string (por ejemplo `Lunes`, `Martes`, etc.)
- La búsqueda **ignora mayúsculas/minúsculas** (`lunes`, `Lunes`, `LUNES` funcionan igual)

Ejemplos:

```bash
curl http://localhost:3000/festival-vina-2026/programacion/Lunes
curl http://localhost:3000/festival-vina-2026/programacion/lunes
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

Si quieres, puedo agregar ejemplos de respuesta completa del endpoint `/parrilla` o describir cada día con su lineup en el README.