# Blog API

API REST para gestionar autores y posts, construida con Node.js, Express y PostgreSQL.

## Tecnologías

- Node.js + Express
- PostgreSQL
- Jest + Supertest
- Swagger UI (OpenAPI 3.0)
- Railway (deploy)

---

## Requisitos

- Node.js v18+
- PostgreSQL v15+

---

## Ejecutar localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/LeonelFernandez01/ProyectoM2_LeonelFernandez-.git
cd ProyectoM2_LeonelFernandez-
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo y completá con tus datos:

```bash
cp .env.example .env
```

Contenido del `.env`:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=blog_api
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=3000
```

### 4. Crear la base de datos

```bash
psql -U postgres
```

```sql
CREATE DATABASE blog_api;
\c blog_api
```

### 5. Ejecutar el script SQL de setup

```bash
psql -U postgres -d blog_api -f db/setup.sql
```

### 6. (Opcional) Cargar datos de prueba

```bash
psql -U postgres -d blog_api -f db/seed.sql
```

### 7. Iniciar el servidor

```bash
npm run dev
```

El servidor corre en `http://localhost:3000`

---

## Ejecutar tests

```bash
npm test
```

---

## Documentación OpenAPI

Con el servidor corriendo, abrí en el navegador:

```
http://localhost:3000/api-docs
```

O en producción:

```
https://proyectom2leonelfernandez-production.up.railway.app/api-docs
```

---

## Endpoints

### Authors

| Método | Endpoint     | Descripción          |
| ------ | ------------ | -------------------- |
| GET    | /authors     | Listar autores       |
| GET    | /authors/:id | Obtener autor por ID |
| POST   | /authors     | Crear autor          |
| PUT    | /authors/:id | Actualizar autor     |
| DELETE | /authors/:id | Eliminar autor       |

### Posts

| Método | Endpoint                | Descripción         |
| ------ | ----------------------- | ------------------- |
| GET    | /posts                  | Listar posts        |
| GET    | /posts/:id              | Obtener post por ID |
| GET    | /posts/author/:authorId | Posts por autor     |
| POST   | /posts                  | Crear post          |
| PUT    | /posts/:id              | Actualizar post     |
| DELETE | /posts/:id              | Eliminar post       |

---

## Deploy en Railway

### 1. Crear proyecto en Railway

- Conectar repositorio de GitHub
- Agregar servicio PostgreSQL

### 2. Variables de entorno en Railway

En el servicio Node.js agregar:

```
DB_USER=postgres
DB_HOST=postgres.railway.internal
DB_NAME=railway
DB_PASSWORD=<valor de PGPASSWORD en PostgreSQL>
DB_PORT=5432
PORT=3000
```

### 3. Crear tablas en Railway

Conectarse con la URL pública de PostgreSQL:

```bash
psql <DATABASE_PUBLIC_URL>
```

Y ejecutar el contenido de `db/setup.sql`.

### 4. Generar dominio público

En Settings → Networking → Generate Domain.

---

## Uso de IA en el proyecto

Este proyecto fue desarrollado con asistencia de Claude (Anthropic) para:

- Estructura del proyecto y organización de carpetas
- Implementación de servicios y controladores
- Configuración de la conexión con PostgreSQL
- Escritura de tests unitarios con Jest
- Configuración de Swagger UI
- Guía de deploy en Railway
