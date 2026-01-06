import { Request, Response, NextFunction } from 'express';

export function validarReporteTransit(req: Request, res: Response, next: NextFunction) {
    const { tipo, descripcion, linea } = req.body;
    const tiposValidos = ['retraso', 'falla', 'accidente', 'mantenimiento', 'otro'];

    if (!tipo || !descripcion || !linea) {
        return res.status(400).json({
            error: 'tipo, descripcion y linea son requeridos',
            tiposValidos
        });
    }

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            error: 'tipo inválido',
            tiposValidos
        });
    }

    if (typeof descripcion !== 'string' || descripcion.length < 10 || descripcion.length > 500) {
        return res.status(400).json({
            error: 'La descripción debe tener entre 10 y 500 caracteres'
        });
    }

    next();
}