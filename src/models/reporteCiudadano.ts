import mongoose, {Schema, Document} from "mongoose";

/** Define la interfaz para el modelo de reporte ciudadano */
export interface IReporteCiudadano extends Document {
    ciudad: string;
    titulo: string;
    descripcion: string;
    tipoIncidencia: 'accidente' | 'trafico' | 'clima' | 'obras' | 'otro';
    fechaReporte: Date;
    ubicacion: {
        latitud: number;
        longitud: number;
    };
    estado: 'pendiente' | 'en_proceso' | 'resuelto';
}

/** Define el esquema para el modelo de reporte ciudadano */
const ReporteCiudadanoSchema: Schema = new Schema({
    /** Define el campo ciudad */
    ciudad: {type: String, required: true},

    /** Define el campo titulo */
    titulo: {type: String, required: true},

    /** Define el campo descripcion */
    descripcion: {
        type: String,
        required: true
    },

    /** Define el campo ubicacion */
    ubicacion: {
        latitud: { type: Number, required: true },
        longitud: { type: Number, required: true },
    },

    /** Define el campo fechaReporte */
    fechaReporte: {
        type: Date,
        required: true,
        default: Date.now
    },

    /** Define el campo tipoIncidencia */
    tipoIncidencia: { 
        type: String, 
        required: true, 
        enum: ['accidente', 'trafico', 'clima', 'obras', 'otro'] 
    },

    /** Define el campo estado */
    estado: {
        type: String,
        required: true,
        default: 'pendiente',
        enum: ['pendiente', 'en_proceso', 'resuelto']
    }
});

/** Define el modelo para el modelo de reporte ciudadano */
export default mongoose.model<IReporteCiudadano>('ReporteCiudadano', ReporteCiudadanoSchema);