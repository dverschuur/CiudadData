import axios from 'axios';
import ReporteCiudadanoTransit from '../models/reporteCiudadanoTransit';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import * as fs from 'fs';
import * as path from 'path';

// Configuración de múltiples feeds del MTA
interface MTAFeedConfig {
    name: string;
    url: string;
    lines: string[];
}

const MTA_FEEDS: MTAFeedConfig[] = [
    {
        name: 'ACE',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
        lines: ['A', 'C', 'E']
    },
    {
        name: 'BDFM',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
        lines: ['B', 'D', 'F', 'M']
    },
    {
        name: 'G',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
        lines: ['G']
    },
    {
        name: 'JZ',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz',
        lines: ['J', 'Z']
    },
    {
        name: 'NQRW',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
        lines: ['N', 'Q', 'R', 'W']
    },
    {
        name: 'L',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
        lines: ['L']
    },
    {
        name: '1234567',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
        lines: ['1', '2', '3', '4', '5', '6', '7']
    },
    {
        name: 'SIR',
        url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si',
        lines: ['SI']
    }
];

// Función para determinar qué feeds consultar según la línea o todas si no se especifica
function getFeedsToQuery(lineFilter?: string): MTAFeedConfig[] {
    if (!lineFilter) {
        return MTA_FEEDS; // Consultar todos los feeds
    }
    
    return MTA_FEEDS.filter(feed => 
        feed.lines.some(line => line.toUpperCase() === lineFilter.toUpperCase())
    );
}

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

export async function obtenerETA(stopId: string, lineFilter?: string) {
    try {
        const stopsFilePath = path.join(__dirname, '..', '..', 'data', 'stops.txt');
        const stopsData = fs.readFileSync(stopsFilePath, 'utf8');
        const lines = stopsData.split('\n');
        const header = lines.shift()?.split(',');
        let stopName: string | null = null;

        if (header) {
            const stopIdIndex = header.indexOf('stop_id');
            const stopNameIndex = header.indexOf('stop_name');

            if (stopIdIndex !== -1 && stopNameIndex !== -1) {
                for (const line of lines) {
                    const values = line.split(',');
                    if (values[stopIdIndex] === stopId) {
                        stopName = values[stopNameIndex] || `Parada ${stopId}`;
                        break;
                    }
                }
            }
        }

        // Determinar qué feeds consultar
        const feedsToQuery = getFeedsToQuery(lineFilter);
        const rawArrivals: { routeId: string | undefined, eta: number, etaTimestamp: string, feedName: string }[] = [];
        let lastUpdatedTimestamp = 0;

        // Consultar todos los feeds relevantes
        const feedPromises = feedsToQuery.map(async (feedConfig) => {
            try {
                const response = await axios.get(feedConfig.url, { 
                    responseType: 'arraybuffer'
                });

                const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(response.data);
                const now = Date.now();

                // Actualizar el timestamp más reciente
                const feedTimestamp = Number(feed.header.timestamp);
                if (feedTimestamp > lastUpdatedTimestamp) {
                    lastUpdatedTimestamp = feedTimestamp;
                }

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
                                        feedName: feedConfig.name
                                    });
                                }
                            }
                        });
                    }
                });
            } catch (error: any) {
                console.warn(`Error consultando feed ${feedConfig.name}:`, error.message);
                // Continuar con los demás feeds aunque uno falle
            }
        });

        // Esperar a que todas las consultas terminen
        await Promise.all(feedPromises);

        // Ordenar por tiempo de llegada
        rawArrivals.sort((a, b) => a.eta - b.eta);

        const arrivals = rawArrivals.map(a => ({
            routeId: a.routeId,
            line: a.routeId,
            eta: `${a.eta} minutos`,
            etaTimestamp: a.etaTimestamp,
            feed: a.feedName
        }));

        return {
            stopId,
            stopName,
            arrivals,
            totalArrivals: arrivals.length,
            feedsQueried: feedsToQuery.map(f => f.name),
            lastUpdated: lastUpdatedTimestamp > 0 
                ? new Date(lastUpdatedTimestamp * 1000).toISOString() 
                : new Date().toISOString()
        };

    } catch (error: any) {
        console.error('Error fetching or processing GTFS data:', error);
        throw new Error(`Error al obtener ETA para la parada ${stopId}: ${error.message}`);
    }
}

export async function obtenerRutas(city: string) {
    try {
        // 1. Leer y procesar el archivo de paradas (stops.txt)
        const stopsFilePath = path.join(__dirname, '..', '..', 'data', 'stops.txt');
        const stopsData = fs.readFileSync(stopsFilePath, 'utf8');
        const stopsLines = stopsData.split('\n');
        const stopsHeader = stopsLines.shift()?.split(',');
        
        const stationsByRoute = new Map<string, any[]>();
        
        if (stopsHeader) {
            const stopIdIndex = stopsHeader.indexOf('stop_id');
            const stopNameIndex = stopsHeader.indexOf('stop_name');
          

            if (stopIdIndex !== -1 && stopNameIndex !== -1) {
                stopsLines.forEach(line => {
                    const values = line.split(',');
                    const stopId = values[stopIdIndex];
                    
                    if (stopId) {
                       
                        const routeId = stopId.charAt(0).toUpperCase();
                        if (!stationsByRoute.has(routeId)) {
                            stationsByRoute.set(routeId, []);
                        }
                        stationsByRoute.get(routeId)!.push({
                            stopId: stopId,
                            stopName: values[stopNameIndex]
                        });
                    }
                });
            }
        }

        
        const routes: any[] = [];
        const feedPromises = MTA_FEEDS.map(async (feedConfig) => {
            try {
                const response = await axios.get(feedConfig.url, { 
                    responseType: 'arraybuffer'
                });

                const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(response.data);
                
                const routesInFeed = new Set<string>();
                
                feed.entity.forEach((entity) => {
                    if (entity.tripUpdate?.trip?.routeId) {
                        routesInFeed.add(entity.tripUpdate.trip.routeId);
                    }
                    if (entity.vehicle?.trip?.routeId) {
                        routesInFeed.add(entity.vehicle.trip.routeId);
                    }
                });

              
                Array.from(routesInFeed).forEach(routeId => {
                    if (!routes.find(r => r.routeId === routeId)) {
                        routes.push({
                            routeId,
                            line: routeId,
                            feed: feedConfig.name,
                            feedLines: feedConfig.lines,
                            stations: stationsByRoute.get(routeId) || [] // Adjuntar estaciones
                        });
                    }
                });
            } catch (error: any) {
                console.warn(`Error consultando rutas del feed ${feedConfig.name}:`, error.message);
            }
        });

        await Promise.all(feedPromises);

         
        routes.sort((a, b) => {
            const aNum = parseInt(a.routeId);
            const bNum = parseInt(b.routeId);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return aNum - bNum;
            }
            return a.routeId.localeCompare(b.routeId);
        });

        return {
            city: 'NYC',
            totalRoutes: routes.length,
            routes,
            timestamp: new Date().toISOString()
        };

    } catch (error: any) {
        console.error('Error fetching routes:', error);
        throw new Error(`Error al obtener rutas para ${city}: ${error.message}`);
    }
}