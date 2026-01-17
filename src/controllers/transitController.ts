import { Request, Response } from 'express';
import { guardarIncidente, obtenerETA, obtenerRutas } from '../services/transitService';

/** Guarda un nuevo incidente en el sistema de tránsito */
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

export async function getETA(req: Request, res: Response) {
    const { stop_id } = req.query;

    if (!stop_id || typeof stop_id !== 'string') {
        return res.status(400).json({ error: 'Se requiere el parámetro stop_id' });
    }

    try {
        const etaData = await obtenerETA(stop_id);
        res.status(200).json({ success: true, data: etaData });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Error al obtener ETA' });
    }
}

export async function getRoutes(req: Request, res: Response) {
    const { city } = req.params;

    if (!city) {
        return res.status(400).json({ error: 'Se requiere el parámetro city' });
    }

    try {
        const routesData = await obtenerRutas(city);
        res.status(200).json({ success: true, data: routesData });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Error al obtener rutas' });
    }
}