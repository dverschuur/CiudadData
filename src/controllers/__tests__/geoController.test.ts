/// <reference types="jest" />
/*
  Pruebas de los endpoints del módulo `geo`.

  - Se monta una app Express mínima y se usa `supertest` para simular peticiones
    y afirmar los estados HTTP y cuerpos de respuesta.
*/
// Mock del servicio geoService (debe declararse antes de importar rutas/controllers)
jest.mock('../../services/geoService', () => ({
  crearReporteCiudadano: jest.fn(),
  obtenerCiudad: jest.fn(),
  obtenerPoblacionPais: jest.fn(),
}));
import request from 'supertest';
import express from 'express';
import geoRoutes from '../../routes/geoRoutes';
import * as geoService from '../../services/geoService';

describe('geoController - Endpoints', () => {
  const app = express();
  app.use(express.json());
  app.use('/geo', geoRoutes);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /geo/report - Endpoint de Registro', () => {
    it('debería guardar un reporte correctamente en MongoDB con datos válidos (201)', async () => {
      const mockReporte = {
        _id: '507f1f77bcf86cd799439011',
        tipo: 'inundación',
        descripcion: 'Calles anegadas en el centro',
        ciudad: 'Madrid',
        fechaReporte: new Date(),
      };
      (geoService.crearReporteCiudadano as jest.Mock).mockResolvedValueOnce(mockReporte);

      const res = await request(app)
        .post('/geo/report')
        .send({ tipo: 'inundación', descripcion: 'Calles anegadas en el centro', ciudad: 'Madrid' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('tipo', 'inundación');
      expect(geoService.crearReporteCiudadano).toHaveBeenCalledWith({
        tipo: 'inundación',
        descripcion: 'Calles anegadas en el centro',
        ciudad: 'Madrid',
      });
    });

    it('debería retornar 400 si faltan campos requeridos (validación middleware)', async () => {
      const res = await request(app)
        .post('/geo/report')
        .send({ tipo: 'inundación' }); 

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('obligatorios');
    });

    it('debería retornar 500 si hay error al guardar en MongoDB', async () => {
      (geoService.crearReporteCiudadano as jest.Mock).mockRejectedValueOnce(
        new Error('Error de conexión a MongoDB')
      );

      const res = await request(app)
        .post('/geo/report')
        .send({ tipo: 'inundación', descripcion: 'Calles anegadas', ciudad: 'Madrid' });

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Error');
    });
  });

  describe('GET /geo/city/:city - Endpoint de Consulta GeoNames', () => {
    it('debería retornar datos correctos integrados de GeoNames (200)', async () => {
      const mockCiudadData = {
        nombre: 'Madrid',
        pais: 'España',
        latitud: '40.416775',
        longitud: '-3.703790',
        poblacion: 3223334,
      };
      (geoService.obtenerCiudad as jest.Mock).mockResolvedValueOnce(mockCiudadData);

      const res = await request(app).get('/geo/city/Madrid');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('nombre', 'Madrid');
      expect(res.body.data).toHaveProperty('pais', 'España');
      expect(res.body.data).toHaveProperty('latitud');
      expect(res.body.data).toHaveProperty('longitud');
      expect(res.body.data).toHaveProperty('poblacion');
      expect(geoService.obtenerCiudad).toHaveBeenCalledWith('Madrid');
    });

    it('debería retornar 404 si la ciudad no existe en GeoNames', async () => {
      (geoService.obtenerCiudad as jest.Mock).mockResolvedValueOnce(null);

      
      const res = await request(app).get('/geo/city/CiudadInexistenteFantasma');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('no encontrada');
    });

    it('debería retornar 500 si hay error al consultar GeoNames', async () => {
      (geoService.obtenerCiudad as jest.Mock).mockRejectedValueOnce(
        new Error('Error de conexión a GeoNames')
      );

      const res = await request(app).get('/geo/city/Madrid');

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Error');
    });
  });

  describe('GET /geo/population/:country - Endpoint de Consulta Banco Mundial', () => {
    it('debería retornar datos correctos integrados del Banco Mundial (200)', async () => {
      const mockPoblacionData = {
        pais: 'España',
        codigoPais: 'ES',
        año: '2020',
        poblacion: 47000000,
        indicador: 'Población total',
      };
      (geoService.obtenerPoblacionPais as jest.Mock).mockResolvedValueOnce(mockPoblacionData);

      const res = await request(app).get('/geo/population/ES');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('pais', 'España');
      expect(res.body.data).toHaveProperty('codigoPais', 'ES');
      expect(res.body.data).toHaveProperty('año');
      expect(res.body.data).toHaveProperty('poblacion');
      expect(res.body.data).toHaveProperty('indicador');
      expect(geoService.obtenerPoblacionPais).toHaveBeenCalledWith('ES');
    });

    it('debería retornar 404 si el país no existe en el Banco Mundial', async () => {
      (geoService.obtenerPoblacionPais as jest.Mock).mockResolvedValueOnce(null);

      // Usar código de país válido según el middleware (2 letras)
      const res = await request(app).get('/geo/population/XX');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('no encontrado');
    });

    it('debería retornar 500 si hay error al consultar el Banco Mundial', async () => {
      (geoService.obtenerPoblacionPais as jest.Mock).mockRejectedValueOnce(
        new Error('Error de conexión al Banco Mundial')
      );

      const res = await request(app).get('/geo/population/ES');

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Error');
    });
  });
});

