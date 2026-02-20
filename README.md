# 🎤 Viña 2026 API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)

Una **API RESTful** integral desarrollada en y para el **Festival Internacional de la Canción de Viña del Mar 2026**. Provee información detallada sobre la parrilla de artistas, humoristas y competidores (internacionales y folclóricos) de las 6 noches del certamen.

---

## 🌟 Características Principales

- **Arquitectura de Software Orgánica:** Construida sobre **NestJS**.
- **Acceso a Datos Robusto:** Interacción de base de datos automatizada y tipada mediante **Prisma ORM**.
- **Seguridad Garantizada:** Endpoints de consulta protegidos mediante **JWT (JSON Web Tokens)** a través de estrategias de `passport-jwt`.
- **Información Verídica Inicializada y Sincronizada:** Incluye un autómata (_Seed_) que vuelca la **Malla Oficial del Festival** separada por días de forma exacta y basada en fuentes fidedignas (Wikipedia).
- **Documentación Viva y Lista para Usar:** Documentación totalmente visual a través de **Swagger UI** (`/docs`) interactiva.
- **Preparado para Embutir en Nube:** Dotado con archivo `.toml` unificado con Nixpacks en **Railway** para integración contínua (CI/CD).
- **Entorno Local Ágil:** Soporte para levantar base de datos **PostgreSQL** efímera a través de **Docker Compose**.

---

## 🏗️ Requisitos Previos

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (Para la base de datos local)
- [NPM](https://www.npmjs.com/)

---

## 🚀 Despliegue Local (Paso a Paso)

### 1. Clonar el repositorio
```bash
git clone https://github.com/robertocaamanor/api-vina-2026.git
cd vina_2026_api
```

### 2. Variables de entorno e Inicialización
Crea (si no existe) o modifica el archivo `.env` en la raíz del proyecto usando el formato que provee Prisma:

```env
DATABASE_URL="postgresql://admin:adminpassword@localhost:5433/vinadb?schema=public" # URL de BD
API_USER=admin                                # Usuario para JWT
API_PASSWORD=admin123                         # Contraseña maestra
JWT_SECRET=tu_clave_secreta_aqui              # LLave Criptográfica UUID o similiar
PORT=3000
```

### 3. Instalar Dependencias del Marco y Cliente
```bash
npm install
```

### 4. Encender Base de Datos PostgreSQL usando Docker Compose
Esto arrancará silenciosamente el contenedor de Postgres en el puerto `5433`:
```bash
docker-compose up -d
```

### 5. Configurar Esqueleto de Datos y Poblar Información Oficial
```bash
npx prisma generate  # Tipos TypeScript
npx prisma db push   # Crear Tablas (Day, Act, Competition)
npx prisma db seed   # Volcar la información de los Días, Humoristas, Músicos según Wikipedia
```

### 6. ¡Arrancar Servidor NestJS en Modo de Desarrollo Caliente!
```bash
npm run start:dev
```

El servidor quedará expuesto y a la escucha en **`http://localhost:3000`**

---

## 📚 Documentación Interfaz & Uso de API (Swagger)

Abre y visita tu red de pruebas en el navegador web para ir a **Swagger**:
👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

### Flujo Crítico de Autenticación
Debido a que cada endpoint de la API (`/days`, `/acts`, `/competitions`) está cercado por el **`JwtAuthGuard`**, antes de realizar la revisión general debes solicitar un pase especial:
1. En Swagger, haz clic sobre `POST /auth/login`.
2. Presiona _Try it out_ seguido de _Execute_. **Las credenciales ("admin" / "admin123") se rellenarán automáticamente gracias a un auto-inyector pre-configurado**.
3. Copia el `access_token` otorgado.
4. Sube en la misma ventana de Swagger al tope de la página y pulsa el botón gris oscuro **Authorize 🔒**. ¡Pega el token ahí!

¡Ahora ya podrás ejecutar el resto de operaciones (`GET /acts?type=HUMORIST`, `GET /days`) sin bloqueos!

_(Alternativamente, puedes usar el archivo incluido **`postman_collection.json`** abriéndolo en [Postman](https://www.postman.com/); ese entorno ya extrae y aplica automáticamente el Token en segundo plano sin intervención por tu parte)._

---

## ☁️ Despliegue en Producción (Railway Automático)

Esta aplicación posee capacidad Plug-and-Play (*Lista para Desplegar*) sobre servicios impulsados por *Nixpacks* (ej: [Railway.app](https://railway.app/)).

1. Conecta este repositorio en Github a de cara a un nuevo proyecto en Railway.
2. Agrega una base de datos nueva de tipo **PostgreSQL** vinculada ahí mismo en el marco de trabajo del proyecto
3. Copia todas las Variables de Entorno y añade además dentro a la variable `DATABASE_URL` vinculada internamente por Railway a tu base generada.
4. El archivo maestro `railway.toml` está configurado para, de forma automática en cada nuevo _commit_ a la rama principal (*main*):
   * Instalar dependencias e iniciar compilador TypeScript -> JavaScript (`npm run build`).
   * Desperar a Prisma para inyectar modelos (`generate`)
   * Forzar las tablas sobre la nueva Database PostgreSQL alojada en Nube (`db push`).
   * Recargar siempre de manera fresca la parrilla final del certamen (`db seed`).

---

## 🗂️ Entidades Manejadas

- `Day`: Representa una noche / jornada del festival unificada por fecha.
- `Act`: Interprete (Músico o Humorista) enlazado al día.
- `Competition`: Competencia musical diferenciando por géneros entre Folclórico e Internacional con su representante internacional respectivo en cada día.

> **¡Felicidades a todos los Viñamarinos y al mundo Hispano por la sexagésima quinta celebración!** 🐦
