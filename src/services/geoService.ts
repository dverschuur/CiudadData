import reporteCiudadano, {IReporteCiudadano} from '../models/reporteCiudadano';

export const crearReporteCiudadano = async (data: Partial<IReporteCiudadano>): Promise<IReporteCiudadano> => {
    const newReporte = new reporteCiudadano(data);
    return await newReporte.save();
};