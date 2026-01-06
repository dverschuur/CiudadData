// Archivo ejecutado por Jest después de configurar el entorno de pruebas.
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

export {};
