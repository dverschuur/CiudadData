NUESTRO PROYECTO CiudadData 

BREVE DESCRIPCIÓN DEL PROYECTO: 
Proyecto backend para gestionar datos de ciudad con Node.js, TypeScript y MongoDB. Incluye la configuración básica del servidor, conexión a la base de datos y los scripts para desarrollo y producción.

REQUISITOS PARA INSTALACIÓN Y USO: 
- Node.js v16 o superior
- npm
- Una instancia de MongoDB (Atlas o local) con URI de conexión

INSTALACIÓN:
1. Clona el repositorio usando el comando:
	git clone <repo-url>
	cd CiudadData

2. Instala dependencias:
	npm install

CONFIGURACIÓN:

1. Crea un archivo `.env` en la raíz del proyecto con las variables mínimas:

	MONGO_URI=tu_uri_de_mongodb
	PORT=3000
	NODE_ENV=development

2. Opcional: crea un archivo `.env.example` con las mismas claves pero sin valores, y añade `.env` a `.gitignore`.

Scripts disponibles: 

- `npm run dev` — arranca el servidor en modo desarrollo (usa `nodemon` según la configuración del proyecto).
- `npm run build` — compila TypeScript a JavaScript en la carpeta `dist`.
- `npm start` — ejecuta la versión compilada en `dist`.
- `npm test` — ejecuta los tests (si están implementados).

Ejecutar en desarrollo:

1. Asegúrate de tener `.env` con `MONGO_URI` configurado.
2. Ejecuta:

	npm run dev

La API por defecto expone al menos la ruta raíz `/` que responde con un mensaje simple. Si se añade documentación Swagger, suele montarse en `/api-docs`.

COMPILAR Y EJECUTAR: 

1. Compila:

	npm run build

2. Inicia:

	npm start

PARA LAS PRUEBAS: 

Si se agregan tests, se ejecutan con:

	npm test 

	..