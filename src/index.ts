import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarbd } from './conexionbd';
<<<<<<< HEAD
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
=======
import geoRoutes from './routes/geoRoutes';
import transitRoutes from './routes/transitRoutes';
>>>>>>> e65dd60616f834e0186c8e275b7b7b589dfb4d5c

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/geo', geoRoutes);
app.use('/transit', transitRoutes);

// Swagger UI - documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * GET /swagger.json
 * @summary Obtener el archivo Swagger JSON
 * @returns {object} 200 - Archivo Swagger JSON
 */
app.get('/swagger.json', (req: Request, res: Response) => {
    res.json(swaggerDocument);
});

conectarbd();

/**
 * GET /
 * @summary Devuelve mensaje de bienvenida y hora del servidor
 * @returns {object} 200 - Mensaje de éxito con timestamp
 * @example response - 200
 * {
 *   "message": "hola, la api funciona :p",
 *   "timestamp": "2026-01-06T12:34:56.789Z"
 * }
 */
app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'hola, la api funciona :p',
        timestamp: new Date(),
        endpoints: {
            geo: '/geo',
            transit: '/transit'
        }
    });
});

// Iniciar servidor
app.listen(port, () => { 
    console.log(`Servidor escuchando en http://localhost:${port}`);
});