import { Router } from 'express';
import { postIncident, getETA } from '../controllers/transitController';
import { validarReporteTransit } from '../middlewares/validarReporteTransit';

const router = Router();

router.post('/incident', validarReporteTransit, postIncident);
router.get('/eta', getETA);

export default router;