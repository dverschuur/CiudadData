import axios from 'axios';
import ReporteCiudadanoTransit from '../models/reporteCiudadanoTransit';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import * as fs from 'fs';
import * as path from 'path';

const MTA_REALTIME_FEED_URL = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs';

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

export async function obtenerETA(stopId: string) {
    try {
        const stopsFilePath = path.join(__dirname, '..', '..', 'data', 'stops.txt');
        const stopsData = fs.readFileSync(stopsFilePath, 'utf8');
        const lines = stopsData.split('\n');
        const header = lines.shift()?.split(',');
        let stopName: string | null = null;
        let stopFound = false;

        if (header) {
            const stopIdIndex = header.indexOf('stop_id');
            const stopNameIndex = header.indexOf('stop_name');

            if (stopIdIndex !== -1 && stopNameIndex !== -1) {
                for (const line of lines) {
                    const values = line.split(',');
                    if (values[stopIdIndex] === stopId) {
                        stopName = values[stopNameIndex] || `Parada ${stopId}`;
                        stopFound = true;
                        break;
                    }
                }
            }
        }

        if (!stopFound) {
            throw new Error(`ID de parada no válido: ${stopId}`);
        }

        const response = await axios.get(MTA_REALTIME_FEED_URL, { 
            responseType: 'arraybuffer' 
        });

        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(response.data);
        const now = Date.now();

        const rawArrivals: { routeId: string | undefined, eta: number, etaTimestamp: string }[] = [];

        feed.entity.forEach((entity) => {
            if (entity.tripUpdate && entity.tripUpdate.stopTimeUpdate) {
                entity.tripUpdate.stopTimeUpdate.forEach((update) => {
                    if (update.stopId === stopId && update.arrival && update.arrival.time) {
                        const arrivalTime = Number(update.arrival.time) * 1000;
                        if (arrivalTime > now) {
                            rawArrivals.push({
                                routeId: entity.tripUpdate?.trip?.routeId ?? undefined,
                                eta: Math.round((arrivalTime - now) / 60000),
                                etaTimestamp: new Date(arrivalTime).toISOString(),
                            });
                        }
                    }
                });
            }
        });

        rawArrivals.sort((a, b) => a.eta - b.eta);

        const arrivals = rawArrivals.map(a => ({
            ...a,
            eta: `${a.eta} minutos`
        }));

        return {
            stopId,
            stopName,
            arrivals,
            lastUpdated: new Date(Number(feed.header.timestamp) * 1000).toISOString()
        };

    } catch (error: any) {
        console.error('Error fetching or processing GTFS data:', error);
        throw new Error(`Error al obtener ETA para la parada ${stopId}: ${error.message}`);
    }
}