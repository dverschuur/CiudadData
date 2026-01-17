import mongoose, { Schema, Document } from 'mongoose';

/** Define la interfaz para el modelo de reporte ciudadano de tránsito */
export interface IReporteCiudadanoTransit extends Document {
    tipo: 'retraso' | 'falla' | 'accidente' | 'mantenimiento' | 'otro';
    descripcion: string;
    linea: string;
    estacion?: string;
    parada?: string;
    severidad: 'baja' | 'media' | 'alta' | 'critica';
    estado: 'reportado' | 'verificado' | 'en_proceso' | 'resuelto';
    reportadoPor?: string;
    ubicacion?: {
        lat: number;
        lng: number;
    };
    fechaReporte: Date;
    fechaActualizacion: Date;
    fechaResolucion?: Date;
}

/** Define el esquema para el modelo de reporte ciudadano de tránsito */
const ReporteCiudadanoTransitSchema: Schema = new Schema({
    tipo: {
        type: String,
        enum: ['retraso', 'falla', 'accidente', 'mantenimiento', 'otro'],
        required: [true, 'El tipo de incidente es requerido']
    },
/** Define el campo descripcion */
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },

/** Define el campo linea */
    linea: {
        type: String,
        required: [true, 'La línea afectada es requerida']
    },

/** Define el campo estacion */
    estacion: {
        type: String
    },

/** Define el campo parada */
    parada: {
        type: String
    },

/** Define el campo severidad */
    severidad: {
        type: String,
        enum: ['baja', 'media', 'alta', 'critica'],
        default: 'media'
    },

/** Define el campo estado */
    estado: {
        type: String,
        enum: ['reportado', 'verificado', 'en_proceso', 'resuelto'],
        default: 'reportado'
    },

/** Define el campo reportadoPor */
    reportadoPor: {
        type: String
    },

/** Define el campo ubicacion */
    ubicacion: {
        lat: { type: Number },
        lng: { type: Number }
    },

/** Define el campo fechaReporte */
    fechaReporte: {
        type: Date,
        default: Date.now
    },

/** Define el campo fechaActualizacion */
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },

/** Define el campo fechaResolucion */
    fechaResolucion: {
        type: Date
    }
});

/** Define el modelo para el modelo de reporte ciudadano de tránsito */
export default mongoose.model<IReporteCiudadanoTransit>('ReporteCiudadanoTransit', ReporteCiudadanoTransitSchema);