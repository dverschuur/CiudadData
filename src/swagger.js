const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

/** Define la documentación de la API */
const doc = {
    info: {
        title: 'API de Ciudades',
        description: 'Documentación de la API para la gestión de ciudades',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

/** Define el archivo de salida para la documentación */
const outputFile = path.join(__dirname, 'swagger_output.json');
const endpointsFiles = [
    path.join(__dirname, 'index.ts'),
    path.join(__dirname, 'routes/geoRoutes.ts'),
    path.join(__dirname, 'routes/transitRoutes.ts')
];

/** Genera la documentación de la API */
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.ts');
});