import { Request, Response, NextFunction } from 'express';

export const validarReporte = (req: Request, res: Response, next: NextFunction): void => {
    const { ciudad, titulo, descripcion, tipoIncidencia, ubicacion } = req.body;

    if (!ciudad || !titulo || !descripcion || !tipoIncidencia || !ubicacion) {
        res.status(400).json({
            success: false,
            message: 'Faltan campos obligatorios en el reporte'
        });
        return;
    }
    next();
};