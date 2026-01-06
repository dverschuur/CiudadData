import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export function validarEstacion(req: Request, res: Response, next: NextFunction) {
    const stopId = req.query.stop_id as string;

    if (!stopId) {
        return res.status(400).json({ message: 'El ID de la parada es requerido.' });
    }

    const stopsFilePath = path.join(__dirname, '..', '..', 'data', 'stops.txt');
    const stopsData = fs.readFileSync(stopsFilePath, 'utf8');
    const lines = stopsData.split('\n');
    const header = lines.shift()?.split(',');
    let stopFound = false;

    if (header) {
        const stopIdIndex = header.indexOf('stop_id');
        if (stopIdIndex !== -1) {
            for (const line of lines) {
                const values = line.split(',');
                if (values[stopIdIndex] === stopId) {
                    stopFound = true;
                    break;
                }
            }
        }
    }

    if (!stopFound) {
        return res.status(404).json({ message: `ID de parada no válido: ${stopId}` });
    }

    next();
}
