import { Router } from 'express';
import { postIncident } from '../controllers/transitController';
import { validarReporteTransit } from '../middlewares/validarReporteTransit';
import { validarCiudadTransit } from '../middlewares/validarCiudadTransit';

const router = Router();

router.post('/incident', validarCiudadTransit, validarReporteTransit, postIncident);

export default router;