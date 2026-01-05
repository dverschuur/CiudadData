import { Request, Response, NextFunction } from 'express';

export function validarCiudadTransit(req: Request, res: Response, next: NextFunction) {
    const { city } = req.params;
    const ciudadesValidas = ['newyork', 'new-york'];

    if (!city || !ciudadesValidas.includes(city.toLowerCase())) {
        return res.status(400).json({
            error: 'Ciudad no soportada',
            ciudadesValidas
        });
    }

    next();
}