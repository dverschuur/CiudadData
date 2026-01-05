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

export const getCiudad = async (req: Request, res: Response): Promise<void> => {
    try {
        const city = req.params.city!;

        const respuestaCiudad = await geoService.obtenerCiudad(city.trim());

        if (!respuestaCiudad) {
            res.status(404).json({
                success: false,
                message: 'Ciudad no encontrada',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: respuestaCiudad,
        });
    }

    catch (error) {
        const mensaje = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({
            success: false,
            message: 'Error al obtener la ciudad',
            error: mensaje,
        });
    }
};