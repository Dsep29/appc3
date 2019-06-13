import { Schema, model, Document } from 'mongoose';

const MaterialSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El Nombre es necesario' ]
    },
    codigo: {
        type: String,
        // required: [ true, 'Información necesaria' ]
    },
    unidad: {
        type: String,
        // required: [ true, 'Información Necesaria' ]
    },
    cantidad: {
        type: String,
        // required: [ true, 'Información Necesaria' ]
    },
    ordenid: {
        type: Schema.Types.ObjectId,
        ref: 'Orden',
        // required: [ true, 'Información Necesaria' ]
    }
});

interface IMateriales extends Document {
    nombre: String,
    codigo: String,
    unidad: String,
    ordenid: String,
    cantidad: String
}


export const Material = model<IMateriales>('Material', MaterialSchema);