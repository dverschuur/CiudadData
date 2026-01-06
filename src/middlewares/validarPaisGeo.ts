import {Request, Response, NextFunction} from 'express';

/** Valida que el parámetro country sea válido */
export const validarPaisPoblacion = (req: Request, res: Response, next: NextFunction): void => {
    const {country} = req.params;

    if (!country) {
        res.status(400).json({
            success: false,
            message: 'El codigo de pais es requerido'
        });
        return;
    }

    const validarDigitos = /^[a-zA-Z]{2}$/;
    
    if(!validarDigitos.test(country)){
        res.status(400).json({
            success: false,
            message: 'El codigo de pais debe contener solo 2 letras'
        });
        return;
    }

    next();
}