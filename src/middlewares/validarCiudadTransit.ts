import { Request, Response, NextFunction } from 'express';

export const validarCiudadTransit = (req: Request, res: Response, next: NextFunction): void => {
    const { city } = req.params;

    if (!city) {
        res.status(400).json({
            success: false,
            error: 'El parámetro ciudad es requerido'
        });
        return;
    }

    const cityLower = city.toLowerCase();
    
    if (cityLower !== 'nyc' && cityLower !== 'newyork' && cityLower !== 'new-york') {
        res.status(400).json({
            success: false,
            error: 'Ciudad no soportada. Solo se soporta NYC por el momento.'
        });
        return;
    }

    next();
};
