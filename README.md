# **Proyecto CiudadData**
 Descripción
Backend para gestión de datos urbanos usando Node.js, TypeScript y MongoDB. Incluye endpoints para incidencias geográficas, tránsito y consulta de datos poblacionales.


## Instalación y configuración rápida

### **Requisitos**
- Node.js v16+
- npm (o yarn)
- Instancia de MongoDB (Atlas o local) — opcional para tests si usas mocks o `mongodb-memory-server`

### **Pasos**
1. Clona el repositorio:
   git clone <repo-url>
   cd CiudadData

2. Instala las dependencias:
   npm install

3. Crea un archivo `.env` en la raíz (ejemplo):
```env
PORT=3000
MONGO_URI=mongodb+srv://adminbd:12345@ciudaddata.n2ao9pe.mongodb.net/?appName=CiudadData
GEONAMES_USER=admin_ciudaddata
JWT_SECRET=your_jwt_secret
```

4. Archivo de entorno para pruebas `.env.test` (ya incluido en el repo de ejemplo):
```env
NODE_ENV=test
MONGO_URI=mongodb://localhost:27017/ciudaddata_test
PORT=3001
JWT_SECRET=secret_test
GEONAMES_USER=test_user
```

### **Instalación adicional recomendada para tests**
- (Opcional) `cross-env` para forzar `NODE_ENV=test` de forma portable en scripts de npm:
  ```bash
  npm install -D cross-env
  ```
- (Opcional) `mongodb-memory-server` para ejecutar MongoDB en memoria durante tests de integración:
  ```bash
  npm install -D mongodb-memory-server
  ```

### **Scripts disponibles**
- `npm run dev` — Servidor en desarrollo (nodemon + ts-node)
- `npm run build` — Compila TypeScript
- `npm start` — Ejecuta la versión compilada
- `npm test` — Ejecuta tests con Jest
- `npm run test:watch` — Ejecuta tests en modo watch
- `npm run test:coverage` — Ejecuta tests y muestra cobertura

---

##  Documentación de la API — Swagger UI
- Accede a la documentación interactiva de la API en:
  [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)
- El archivo Swagger JSON está disponible en el archivo`/swagger.json`.

## Ejecutar las pruebas

Comandos básicos:
```bash
npm run test
npm run test:watch
npm run test:coverage
```


##  Endpoints principales

### **/geo/report** `[POST]`
Reporta incidencias geográficas (inundaciones, tráfico, etc.)
- Requiere campos: `tipo`, `descripcion`, `ciudad`
- Respuestas: `201` (creado), `500` (error)

### **/geo/city/{city}** `[GET]`
Obtiene datos de una ciudad (latitud, longitud, población, país)
- Parámetro URL: `city` (string)
- Respuestas: `200`, `404` (no encontrada), `500`

### **/geo/population/{country}** `[GET]`
Consulta la población de un país determinado
- Parámetro URL: `country` (string/código)
- Respuestas: `200`, `404`, `500`

### **/transit/incident** `[POST]`
Reporta un incidente de transporte (accidente, retraso, etc.)
- Requiere campos: `tipo`, `descripcion`, `linea`, `severidad`, etc.
- Respuestas: `201`, `500`

---

## Ejemplos de uso

### Reportar incidente geográfico
```bash
curl -X POST http://localhost:3000/geo/report -H "Content-Type: application/json" -d '{"tipo":"inundación","descripcion":"Calles inundadas en el centro","ciudad":"Madrid"}'
```

### Obtener datos de ciudad
```bash
curl http://localhost:3000/geo/city/Madrid
```

### Reportar incidente de tránsito
```bash
curl -X POST http://localhost:3000/transit/incident -H "Content-Type: application/json" -d '{"tipo":"accidente","descripcion":"Choque en la línea 1","linea":"1","severidad":"alta"}'
```


##  Notas
- Asegúrate de consultar la [documentación Swagger](http://localhost:3000/api-docs) para ver todos los detalles y ejemplos extendidos.
- Si agregas endpoints o modelos, manten actualizado Swagger con `npm run swagger` o reiniciando el servidor, según configuración.

