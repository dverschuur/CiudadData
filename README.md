# **Proyecto CiudadData**
 Descripción
Backend para gestión de datos urbanos usando Node.js, TypeScript y MongoDB. Incluye endpoints para incidencias geográficas, tránsito y consulta de datos poblacionales.


## Instalación y configuración

### **Requisitos del sistema**

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16 o superior
- **npm** (viene incluido con Node.js) o **yarn**
- **MongoDB** (local o cuenta en MongoDB Atlas)
- **Git** (para clonar el repositorio)

#### **Instalación de Node.js y npm**

1. **instalación de node.js**
   - Descarga Node.js desde [nodejs.org](https://nodejs.org/)
   - Instala la versión LTS (Long Term Support)
   - Verifica la instalación:
     ```bash
     node --version
     npm --version
     ```

#### **Instalación de MongoDB**

**Opción 1: MongoDB Atlas (Recomendado para desarrollo rápido)**
1. Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### **Pasos de instalación del proyecto**

#### **1. Clonar el repositorio**

```bash
git clone https://github.com/dverschuur/CiudadData.git
cd CiudadData
```

#### **2. Instalar dependencias**

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- **Dependencias de producción:** express, mongoose, axios, cors, dotenv, etc.
- **Dependencias de desarrollo:** typescript, jest, ts-jest, nodemon, swagger-autogen, etc.

#### **3. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Puerto del servidor
PORT=3000

# URI de conexión a MongoDB
# Para MongoDB Atlas:
MONGO_URI=mongodb+srv://adminbd:12345@ciudaddata.n2ao9pe.mongodb.net/?appName=CiudadData

# Usuario de GeoNames API (requerido para consultas geográficas)
GEONAMES_USER=admin_ciudaddata

# Entorno de ejecución
NODE_ENV=development
```



#### **4. Configurar entorno de pruebas**

Crea un archivo `.env.test` en la raíz del proyecto para las pruebas unitarias:

```env
NODE_ENV=test
MONGO_URI=mongodb+srv://adminbd:12345@ciudaddata.n2ao9pe.mongodb.net/?appName=CiudadData
PORT=3001
JWT_SECRET=secret_test
GEONAMES_USER=admin_ciudaddata
```

**Importante:** Asegúrate de que MongoDB esté corriendo localmente para las pruebas, o ajusta la URI según tu configuración.

#### **5. Verificar la instalación**


 **Ejecutar pruebas:**
   ```bash
   npm run test
   ```

**Iniciar servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

   El servidor debería iniciarse en `http://localhost:3000`

 **Verificar documentación Swagger:**
   - Accede a: `http://localhost:3000/api-docs`
   - Deberías ver la documentación interactiva de la API


##  Documentación de la API — Swagger UI
- Accede a la documentación interactiva de la API en:
  [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)
- El archivo Swagger JSON está disponible en el archivo`/swagger.json`.

##  Notas
- Si agregas endpoints o modelos, manten actualizado Swagger con `npm run swagger` o reiniciando el servidor, según configuración.

