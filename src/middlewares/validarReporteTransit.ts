import { Request, Response, NextFunction } from 'express';

/** Valida que el reporte de tránsito tenga los campos obligatorios */
export function validarReporteTransit(req: Request, res: Response, next: NextFunction) {
    const { tipo, descripcion, linea } = req.body;
    const tiposValidos = ['retraso', 'falla', 'accidente', 'mantenimiento', 'otro'];

    /** Valida que los campos obligatorios estén presentes */
    if (!tipo || !descripcion || !linea) {
        return res.status(400).json({
            error: 'tipo, descripcion y linea son requeridos',
            tiposValidos
        });
    }

    /** Valida que el tipo de incidente sea válido */
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            error: 'tipo inválido',
            tiposValidos
        });
    }

    /** Valida que la descripción tenga entre 10 y 500 caracteres */
    if (typeof descripcion !== 'string' || descripcion.length < 10 || descripcion.length > 500) {
        return res.status(400).json({
            error: 'La descripción debe tener entre 10 y 500 caracteres'
        });
    }

    next();
}