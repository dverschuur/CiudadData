const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API de Ciudades',
        description: 'Documentación de la API para la gestión de ciudades',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = path.join(__dirname, 'swagger_output.json');
const endpointsFiles = [path.join(__dirname, 'index.ts')]; 

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.ts'); 
});