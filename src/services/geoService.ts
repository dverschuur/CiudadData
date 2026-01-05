import reporteCiudadano, {IReporteCiudadano} from '../models/reporteCiudadano';
import axios from 'axios';

export const crearReporteCiudadano = async (data: Partial<IReporteCiudadano>): Promise<IReporteCiudadano> => {
    const newReporte = new reporteCiudadano(data);
    return await newReporte.save();
};

export const obtenerCiudad = async (ciudad: string) => {
    const user = process.env.GEONAMES_USER;
    if (!user) {
        throw new Error('GEONAMES_USER no está definido en las variables de entorno');
    }

    const url = 'http://api.geonames.org/searchJSON';
    const params = {
        name: ciudad,
        maxRows: 1,
        user,
    };

    const {data} = await axios.get(url, {params});

    if (!data?.geonames?.length){
        return null;
    }

    const respuesta = data.geonames[0];
    return {
        nombre: respuesta.name,
        pais: respuesta.countryName,
        latitud: respuesta.lat,
        longitud: respuesta.lng,
        poblacion: respuesta.population,
    };
};