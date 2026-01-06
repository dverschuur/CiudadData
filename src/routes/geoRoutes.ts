import { Router } from 'express';
import * as geoController from '../controllers/geoController';
import { validarReporte } from '../middlewares/validarReporte';
import { validarCiudad } from '../middlewares/validarCiudad';
import { validarPaisPoblacion } from '../middlewares/validarPaisGeo';

const router = Router();

router.post('/report', validarReporte, geoController.postReporteCiudadano);
router.get('/city/:city', validarCiudad, geoController.getCiudad);
router.get('/population/:country',validarPaisPoblacion, geoController.getPoblacionPais);

export default router;