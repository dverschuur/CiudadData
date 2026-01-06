/// <reference types="jest" />

  //Pruebas unitarias para `geoService`.

import { obtenerCiudad, obtenerPoblacionPais, crearReporteCiudadano } from '../geoService';
import axios from 'axios';
// Mock global de axios para controlar respuestas HTTP en pruebas
jest.mock('axios');

describe('geoService', () => {
  describe('obtenerCiudad', () => {
    it('debería devolver null si la ciudad no existe', async () => {
      // Simula que la API de GeoNames responde sin resultados
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: { geonames: [] } });
      const result = await obtenerCiudad('CiudaddataFantasma987');
      expect(result).toBeNull();
    });
  });
  
  describe('obtenerPoblacionPais', () => {
    it('debería devolver null para código de país inexistente', async () => {
      // Simula respuesta del Banco Mundial sin datos útiles
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: [null, []] });
      const result = await obtenerPoblacionPais('ZZZ');
      expect(result).toBeNull();
    });
  });
  
  describe('crearReporteCiudadano', () => {
    it('debería lanzar error si data está vacía', async () => {
      // Si se llama con objeto vacío esperamos que lance (el modelo valida internamente)
      await expect(crearReporteCiudadano({})).rejects.toThrow();
    });
  });
});

