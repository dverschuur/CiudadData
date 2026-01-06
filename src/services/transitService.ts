import axios from 'axios';
import ReporteCiudadanoTransit from '../models/reporteCiudadanoTransit';

const MTA_BASE_URL = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds';

export async function guardarIncidente(data: {
    tipo: 'retraso' | 'falla' | 'accidente' | 'mantenimiento' | 'otro';
    descripcion: string;
    linea: string;
    estacion?: string;
    parada?: string;
    severidad?: 'baja' | 'media' | 'alta' | 'critica';
    reportadoPor?: string;
    ubicacion?: { lat: number; lng: number };
}) {
    const nuevoReporte = new ReporteCiudadanoTransit(data);
    return await nuevoReporte.save();
}