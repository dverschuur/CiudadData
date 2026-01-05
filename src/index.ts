import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarbd } from './conexionbd';
import geoRoutes from './routes/geoRoutes';
import transitRoutes from './routes/transitRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/geo', geoRoutes);
app.use('/transit', transitRoutes);

conectarbd();

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