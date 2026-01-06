import { format } from 'node:path';
import reporteCiudadano, {IReporteCiudadano} from '../models/reporteCiudadano';
import axios from 'axios';

export const crearReporteCiudadano = async (data: Partial<IReporteCiudadano>): Promise<IReporteCiudadano> => {
    const newReporte = new reporteCiudadano(data);
    return await newReporte.save();
};

export const obtenerCiudad = async (city: string) => {
    const user = process.env.GEONAMES_USER;
    if (!user) {
        throw new Error('GEONAMES_USER no está definido en las variables de entorno');
    }

    const url = 'http://api.geonames.org/searchJSON';
    const params = {
        name: city,
        maxRows: 1,
        username: user,
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

export const obtenerPoblacionPais = async (country: string) => {
    const url = `http://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL`;
    const params = {
        format: 'json',
        per_page: 10,
    };

    const {data} = await axios.get(url, {params});

    
    if (!data?.[1]?.length) {
        return null;
    }

    const respuesta = data[1].find((item: any) => item.value !== null);
    
    if (!respuesta) {
        return null;
    }

    return {
        pais: respuesta.country.value,
        codigoPais: respuesta.country.id,
        año: respuesta.date,
        poblacion: respuesta.value,
        indicador: respuesta.indicator.value,
    };
};
