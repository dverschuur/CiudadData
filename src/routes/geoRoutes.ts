import { Router } from 'express';
import * as geoController from '../controllers/geoController';
import { validarReporte } from '../middlewares/validarReporte';
import { validarCiudad } from '../middlewares/validarCiudad';

const router = Router();
router.post('/report', validarReporte, geoController.postReporteCiudadano);
router.get('/city/:city', validarCiudad, geoController.getCiudad);

export default router;