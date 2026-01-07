import mongoose from 'mongoose';

/** Conecta a la base de datos MongoDB */
export const conectarbd = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb+srv://adminbd:12345@ciudaddata.n2ao9pe.mongodb.net/?appName=CiudadData';
    
    await mongoose.connect(dbUri);
    
    console.log('Base de datos conectada exitosamente a:', mongoose.connection.name);
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    // Evitar terminar el proceso durante tests (Jest intercepta llamadas a process.exit)
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};