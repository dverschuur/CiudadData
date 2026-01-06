import { Router } from 'express';
import { postIncident } from '../controllers/transitController';
import { validarReporteTransit } from '../middlewares/validarReporteTransit';

const router = Router();

router.post('/incident', validarReporteTransit, postIncident);

export default router;