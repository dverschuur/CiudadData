import { Router } from 'express';
import * as geoController from '../controllers/geoController';
import { validarReporte } from '../middlewares/validarReporte';

const router = Router();
router.post('/report', validarReporte, geoController.postReporteCiudadano);
router.get('/city/:city', geoController.getCiudad);

export default router;