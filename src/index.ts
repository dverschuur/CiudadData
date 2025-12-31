import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarbd } from './conexionbd';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

conectarbd();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'hola, la api funciona :p',
        timestamp: new Date()
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`📡 Servidor escuchando en http://localhost:${port}`);
});