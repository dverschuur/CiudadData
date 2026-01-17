import { Request, Response, NextFunction } from 'express';

/** Valida que el parámetro ciudad sea válido */
export const validarCiudad = (req: Request, res: Response, next: NextFunction): void => {
    const { city } = req.params;

    // Verificar que el parámetro exista
    if (!city) {
        res.status(400).json({
            success: false,
            message: 'El parámetro ciudad es requerido'
        });
        return;
    }

    // Verificar que no esté vacío o solo espacios
    if (!city.trim()) {
        res.status(400).json({
            success: false,
            message: 'El parámetro ciudad no puede estar vacío'
        });
        return;
    }

    // Verificar longitud mínima (al menos 2 caracteres)
    if (city.trim().length < 2) {
        res.status(400).json({
            success: false,
            message: 'El nombre de la ciudad debe tener al menos 2 caracteres'
        });
        return;
    }

    // Verificar que solo contenga letras, espacios, guiones y apóstrofes
    const patronValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/;
    if (!patronValido.test(city.trim())) {
        res.status(400).json({
            success: false,
            message: 'El nombre de la ciudad contiene caracteres no válidos'
        });
        return;
    }

    next();
};
