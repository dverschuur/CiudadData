import mongoose, {Schema, Document} from "mongoose";

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


const ReporteCiudadanoSchema: Schema = new Schema({
    ciudad: {type: String, required: true},

    titulo: {type: String, required: true},

    descripcion: {
        type: String,
        required: true
    },

    ubicacion: {
        latitud: { type: Number, required: true },
        longitud: { type: Number, required: true },
    },

    fechaReporte: {
        type: Date,
        required: true,
        default: Date.now
    },

    tipoIncidencia: { 
        type: String, 
        required: true, 
        enum: ['accidente', 'trafico', 'clima', 'obras', 'otro'] 
    },

    estado: {
        type: String,
        required: true,
        default: 'pendiente',
        enum: ['pendiente', 'en_proceso', 'resuelto']
    }
});

export default mongoose.model<IReporteCiudadano>('ReporteCiudadano', ReporteCiudadanoSchema);