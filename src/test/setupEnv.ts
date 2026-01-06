import dotenv from 'dotenv';
// carga las variables de entorno desde el archivo .env.test

dotenv.config({ path: '.env.test' });

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

export {};
