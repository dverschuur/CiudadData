import { Router } from 'express';
import { postIncident, getETA, getRoutes } from '../controllers/transitController';
import { validarReporteTransit } from '../middlewares/validarReporteTransit';
import { validarEstacion } from '../middlewares/validarEstacion';
import { validarCiudadTransit } from '../middlewares/validarCiudadTransit';

const router = Router();

router.post('/incident', validarReporteTransit, postIncident);
router.get('/eta', validarEstacion, getETA);
router.get('/routes/:city', validarCiudadTransit, getRoutes);

export default router;