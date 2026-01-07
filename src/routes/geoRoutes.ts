import { Router } from 'express';
import * as geoController from '../controllers/geoController';
import { validarReporte } from '../middlewares/validarReporte';
import { validarCiudad } from '../middlewares/validarCiudad';
import { validarPaisPoblacion } from '../middlewares/validarPaisGeo';

const router = Router();
/** Define el router para el endpoint de reporte ciudadano */
router.post('/report',
    /* 
       #swagger.path = '/geo/report'
       #swagger.summary = 'Reporte ciudadano sobre incidencias geográficas'
       #swagger.description = 'Permite a los ciudadanos reportar problemas como inundaciones, tráfico, etc.'
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'Información del reporte',
            required: true,
            schema: {
                ciudad: 'Caracas',
                titulo: 'Bache',
                descripcion: 'Bache en la av. Chacao',
                ubicacion: {
                    latitud: 10.496,
                    longitud: -66.898
                },
                tipoIncidencia: 'trafico'
            }
       }
       #swagger.responses[201] = { description: 'Reporte creado exitosamente' }
       #swagger.responses[500] = { description: 'Error al crear el reporte' }
    */
    validarReporte, geoController.postReporteCiudadano);

router.get('/city/:city',
    /* 
       #swagger.path = '/geo/city/{city}'
       #swagger.summary = 'Obtiene latitud, longitud y otros datos geográficos de una ciudad específica.'
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
    */
    validarCiudad, geoController.getCiudad);
router.get('/population/:country',
    /* 
       #swagger.path = '/geo/population/{country}'
       #swagger.summary = 'Retorna la población y datos demográficos de un país. '
       #swagger.parameters['country'] = { description: 'Nombre (código) del país' }
       #swagger.responses[200] = { 
            description: 'Población encontrada',
            schema: {
                success: true,
                data: {
                    pais: "España",
                    codigoPais: "ES",
                    año: "2020",
                    poblacion: 47000000,
                    indicador: "Población total"
                }
            }
       }
       #swagger.responses[404] = { description: 'País no encontrado' }
       #swagger.responses[500] = { description: 'Error al buscar la población' }
    */
    validarPaisPoblacion, geoController.getPoblacionPais);

export default router;