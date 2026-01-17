/// <reference types="jest" />
//Pruebas de integración ligera para los endpoints de `transit`.

// Mock del servicio transitService (debe declararse antes de importar rutas/controllers)
jest.mock('../../services/transitService', () => ({
  guardarIncidente: jest.fn(),
}));
import request from 'supertest';
import express from 'express';
import transitRoutes from '../../routes/transitRoutes';
import * as transitService from '../../services/transitService';

describe('transitController - Endpoints', () => {
  const app = express();
  app.use(express.json());
  app.use('/transit', transitRoutes);

  describe('POST /transit/incident - Endpoint de Registro', () => {
    it('debería guardar un incidente correctamente en MongoDB con datos válidos (201)', async () => {
      const mockIncidente = {
        _id: '507f1f77bcf86cd799439012',
        tipo: 'accidente',
        descripcion: 'Choque en la línea 1 entre estaciones',
        linea: '1',
        estacion: 'Gran Via',
        severidad: 'alta',
        estado: 'reportado',
        fechaReporte: new Date(),
      };
      (transitService.guardarIncidente as jest.Mock).mockResolvedValueOnce(mockIncidente);

      const res = await request(app)
        .post('/transit/incident')
        .send({
          tipo: 'accidente',
          descripcion: 'Choque en la línea 1 entre estaciones',
          linea: '1',
          estacion: 'Gran Via',
          severidad: 'alta',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('tipo', 'accidente');
      expect(res.body.data).toHaveProperty('linea', '1');
      expect(transitService.guardarIncidente).toHaveBeenCalledWith({
        tipo: 'accidente',
        descripcion: 'Choque en la línea 1 entre estaciones',
        linea: '1',
        estacion: 'Gran Via',
        severidad: 'alta',
        parada: undefined,
        reportadoPor: undefined,
        ubicacion: undefined,
      });
    });

    it('debería retornar 400 si falta el campo tipo (validación middleware)', async () => {
      const res = await request(app)
        .post('/transit/incident')
        .send({
          descripcion: 'Descripción del incidente',
          linea: '1',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('requeridos');
    });

    it('debería retornar 400 si falta el campo descripcion (validación middleware)', async () => {
      const res = await request(app)
        .post('/transit/incident')
        .send({
          tipo: 'accidente',
          linea: '1',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('requeridos');
    });

    it('debería retornar 400 si falta el campo linea (validación middleware)', async () => {
      const res = await request(app)
        .post('/transit/incident')
        .send({
          tipo: 'accidente',
          descripcion: 'Descripción del incidente',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('requeridos');
    });

    it('debería retornar 400 si el tipo de incidente es inválido (validación middleware)', async () => {
      const res = await request(app)
        .post('/transit/incident')
        .send({
          tipo: 'tipo_invalido',
          descripcion: 'Descripción del incidente con más de 10 caracteres',
          linea: '1',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('tipo inválido');
      expect(res.body.tiposValidos).toBeDefined();
    });

    it('debería retornar 400 si la descripción tiene menos de 10 caracteres (validación middleware)', async () => {
      const res = await request(app)
        .post('/transit/incident')
        .send({
          tipo: 'accidente',
          descripcion: 'Corto',
          linea: '1',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('10 y 500 caracteres');
    });

    it('debería retornar 400 si la descripción tiene más de 500 caracteres (validación middleware)', async () => {
      const descripcionLarga = 'a'.repeat(501);
      const res = await request(app)
        .post('/transit/incident')
        .send({
          tipo: 'accidente',
          descripcion: descripcionLarga,
          linea: '1',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('10 y 500 caracteres');
    });

    it('debería retornar 500 si hay error al guardar en MongoDB', async () => {
      (transitService.guardarIncidente as jest.Mock).mockRejectedValueOnce(
        new Error('Error de conexión a MongoDB')
      );

      const res = await request(app)
        .post('/transit/incident')
        .send({
          tipo: 'accidente',
          descripcion: 'Descripción del incidente con más de 10 caracteres',
          linea: '1',
        });

      expect(res.status).toBe(500);
      expect(res.body.error).toContain('Error');
    });
  });
});

