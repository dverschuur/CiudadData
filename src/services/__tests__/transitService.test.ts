/// <reference types="jest" />

  //Pruebas unitarias para `transitService.guardarIncidente`.

// Mockear el modelo ANTES de importar el servicio a testear
jest.mock('../../models/reporteCiudadanoTransit', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(function (data) {
      return {
        ...data,
        // Simulamos el método save() que devuelve una Promesa
        save: jest.fn().mockImplementation(() => {
          // Simula fallo cuando faltan campos requeridos
          if (!data || !data.tipo || !data.descripcion || !data.linea) {
            return Promise.reject(new Error('Faltan campos requeridos'));
          }
          // Simula éxito retornando el documento con un _id
          return Promise.resolve({ _id: 'testid', ...data });
        })
      };
    })
  };
});

// Importar el servicio bajo prueba después de definir el mock
import { guardarIncidente } from '../transitService';

describe('transitService', () => {
  describe('guardarIncidente', () => {
    it('debería lanzar error si los datos mínimos están ausentes', async () => {
      // Caso de error
      await expect(guardarIncidente({} as any)).rejects.toThrow();
    });

    it('debería guardar un incidente correctamente dados datos válidos', async () => {
      // Datos válidos de ejemplo
      const fakeData = {
        tipo: 'accidente',
        descripcion: 'Accidente de prueba',
        linea: 'Linea 1',
      };
      // Ejecuta la función y compara la respuesta con los datos enviados
      const result = await guardarIncidente(fakeData as any);
      expect(result).toMatchObject(fakeData);
    });
  });
});

