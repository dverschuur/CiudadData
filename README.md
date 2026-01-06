# **Proyecto CiudadData**
 Descripción
Backend para gestión de datos urbanos usando Node.js, TypeScript y MongoDB. Incluye endpoints para incidencias geográficas, tránsito y consulta de datos poblacionales.


## Instalación y configuración rápida

### **Requisitos**
- Node.js v16+
- npm
- Instancia de MongoDB (Atlas o local)

### **Pasos**
1. Clona el repositorio:
   git clone <repo-url>
   cd CiudadData

2. Instala las dependencias con el comando:
   npm install

3. Crea un archivo `.env` en la raíz:
PORT=3000
MONGO_URI=mongodb+srv://adminbd:12345@ciudaddata.n2ao9pe.mongodb.net/?appName=CiudadData
GEONAMES_USER=admin_ciudaddata

4. Esto es lo que debe estar en el env para el entorno de pruebas: 
NODE_ENV=test
MONGO_URI=mongodb://localhost:27017/ciudaddata_test
PORT=3001
JWT_SECRET=secret_test


### **Scripts disponibles**
- `npm run dev` — Servidor en desarrollo
- `npm run build` — Compila TypeScript
- `npm start` — Ejecuta la versión compilada
- `npm test` — Ejecuta tests (si existen)

---

##  Documentación de la API — Swagger UI
- Accede a la documentación interactiva de la API en:
  [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)
- El archivo Swagger JSON está disponible en el archivo`/swagger.json`.

## Para ejecutar las pruebas use el comando: 
npm run test

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

