import { Request, Response } from 'express';
import * as geoService from '../services/geoService';

export const postReporteCiudadano = async (req: Request, res: Response): Promise<void> => {
    try {
        const ReporteData = req.body;
        const guardarReporte = await geoService.crearReporteCiudadano(ReporteData);
        res.status(201).json({
            success: true,
            message: 'Reporte creado exitosamente',
            data: guardarReporte
        });
    }

    catch (error) {
        const mensaje = error instanceof Error ? error.message : 'Error desconocido';
        // Log the full error details server-side for debugging/monitoring.
        console.error('Error al crear reporte ciudadano:', mensaje, error);
        res.status(500).json({
            success: false,
            message: 'Error, no se pudo crear el reporte'
        });
    }
};