import mongoose, { Schema, Document } from 'mongoose';

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

const ReporteCiudadanoTransitSchema: Schema = new Schema({
    tipo: {
        type: String,
        enum: ['retraso', 'falla', 'accidente', 'mantenimiento', 'otro'],
        required: [true, 'El tipo de incidente es requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    linea: {
        type: String,
        required: [true, 'La línea afectada es requerida']
    },
    estacion: {
        type: String
    },
    parada: {
        type: String
    },
    severidad: {
        type: String,
        enum: ['baja', 'media', 'alta', 'critica'],
        default: 'media'
    },
    estado: {
        type: String,
        enum: ['reportado', 'verificado', 'en_proceso', 'resuelto'],
        default: 'reportado'
    },
    reportadoPor: {
        type: String
    },
    ubicacion: {
        lat: { type: Number },
        lng: { type: Number }
    },
    fechaReporte: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
    fechaResolucion: {
        type: Date
    }
});

export default mongoose.model<IReporteCiudadanoTransit>('ReporteCiudadanoTransit', ReporteCiudadanoTransitSchema);