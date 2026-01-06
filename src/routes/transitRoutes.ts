import { Router } from 'express';
import { postIncident, getETA } from '../controllers/transitController';
import { validarReporteTransit } from '../middlewares/validarReporteTransit';
import { validarEstacion } from '../middlewares/validarEstacion';

const router = Router();

router.post('/incident', validarReporteTransit, postIncident);
router.get('/eta', validarEstacion, getETA);

export default router;