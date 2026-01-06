import { Router } from 'express';
import { postIncident, getETA } from '../controllers/transitController';
import { validarReporteTransit } from '../middlewares/validarReporteTransit';
import { validarEstacion } from '../middlewares/validarEstacion';

const router = Router();

router.post('/incident', validarReporteTransit, postIncident);
router.get('/eta', validarEstacion, getETA);
router.post('/incident',
  /* 
     #swagger.path = '/transit/incident'
     #swagger.summary = 'Reporta un incidente en el sistema de tránsito'
     #swagger.description = 'Reporta incidentes como accidentes, retrasos, etc.'
     #swagger.parameters['body'] = {
          in: 'body',
          description: 'Información del incidente',
          required: true,
          schema: {
              tipo: 'accidente',
              descripcion: 'Choque en la línea 1',
              linea: '1',
              estacion: 'Gran Via',
              parada: '',
              severidad: 'alta',
              reportadoPor: 'usuario1',
              ubicacion: { lat: 40.42, lng: -3.7 }
          }
     }
     #swagger.responses[201] = { description: 'Incidente guardado exitosamente' }
     #swagger.responses[500] = { description: 'Error al guardar el incidente' }
  */
  validarReporteTransit, postIncident);

export default router;