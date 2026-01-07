import { Router } from 'express';
import { postIncident, getETA, getRoutes } from '../controllers/transitController';
import { validarReporteTransit } from '../middlewares/validarReporteTransit';
import { validarEstacion } from '../middlewares/validarEstacion';
import { validarCiudadTransit } from '../middlewares/validarCiudadTransit';

const router = Router();

router.post('/incident'
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
  , validarReporteTransit, postIncident);

router.get('/eta'
  /* 
       #swagger.path = '/transit/eta'
       #swagger.summary = 'Obtiene la llegada estimada (ETA) del próximo tren/bus en una estación específica.'
       #swagger.responses[200] = { 
            description: 'Información de llegadas estimadas',
            schema: {
                success: true,
                      data: {
                        "success": true,
                        "data": {
                          "stopId": "103S",
                          "stopName": "238 St",
                          "arrivals": [
                            {
                              "routeId": "1",
                              "line": "1",
                              "eta": "9 minutos",
                              "etaTimestamp": "2026-01-07T03:16:00.000Z",
                              "feed": "1234567"
                            },
                            {
                              "routeId": "1",
                              "line": "1",
                              "eta": "19 minutos",
                              "etaTimestamp": "2026-01-07T03:26:00.000Z",
                              "feed": "1234567"
                            },
                            {
                              "routeId": "1",
                              "line": "1",
                              "eta": "29 minutos",
                              "etaTimestamp": "2026-01-07T03:36:00.000Z",
                              "feed": "1234567"
                            }
                          ],
                          "totalArrivals": 3,
                          "feedsQueried": [
                            "ACE",
                            "BDFM",
                            "G",
                            "JZ",
                            "NQRW",
                            "L",
                            "1234567",
                            "SIR"
                          ],
                          "lastUpdated": "2026-01-07T03:06:28.000Z"
                        }
                      }
            } 
      }
      #swagger.responses[404] = { description: 'Ciudad no encontrada' }
      #swagger.responses[500] = { description: 'Error al buscar la ciudad' }
    */
  , validarEstacion, getETA);

router.get('/routes/:city'
  /* 
      #swagger.path = '/transit/routes/{city}'
      #swagger.summary = 'Obtiene las rutas de transporte para una ciudad específica.'
      #swagger.parameters['city'] = { description: 'Nombre de la ciudad' }
      #swagger.responses[200] = { 
            description: 'Ciudad encontrada',
            schema: {
                success: true,
                data: {
                    nombre: "Madrid",
                    pais: "España",
                    latitud: 40.416775,
                    longitud: -3.703790,
                    poblacion: 3223334
                }
            } 
      }
      #swagger.responses[404] = { description: 'Ciudad no encontrada' }
      #swagger.responses[500] = { description: 'Error al buscar la ciudad' }
    */, validarCiudadTransit, getRoutes);

export default router;