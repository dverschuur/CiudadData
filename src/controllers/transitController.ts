import { Request, Response } from 'express';
import { guardarIncidente } from '../services/transitService';

export async function postIncident(req: Request, res: Response) {
    const { tipo, descripcion, linea, estacion, parada, severidad, reportadoPor, ubicacion } = req.body;

    try {
        const guardado = await guardarIncidente({ 
            tipo, 
            descripcion, 
            linea, 
            estacion, 
            parada, 
            severidad, 
            reportadoPor, 
            ubicacion 
        });
        res.status(201).json({ success: true, data: guardado });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar incidente' });
    }
}