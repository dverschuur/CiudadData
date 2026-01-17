import { Request, Response, NextFunction } from 'express';

/** Valida que el reporte tenga los campos obligatorios */
export const validarReporte = (req: Request, res: Response, next: NextFunction): void => {
    const { ciudad, tipo, descripcion, tipoIncidencia, titulo } = req.body;

    const tipoFinal = tipo || tipoIncidencia || titulo;

    if (!ciudad || !tipoFinal || !descripcion) {
        res.status(400).json({
            success: false,
            message: 'Faltan campos obligatorios en el reporte'
        });
        return;
    }

    // Dejar `req.body.tipo` consistente para controladores/servicios posteriores.
    req.body.tipo = tipoFinal;
    next();
};