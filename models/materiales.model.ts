import { Document, model, Schema } from "mongoose";

const MaterialSchema = new Schema({

    nombre: {
        type: String,
// tslint:disable-next-line: object-literal-sort-keys
        required: [ true, "El Nombre es necesario" ]
    },
// tslint:disable-next-line: object-literal-sort-keys
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
// tslint:disable-next-line: object-literal-sort-keys
        ref: "Orden",
        // required: [ true, 'Información Necesaria' ]
    }
});

interface IMateriales extends Document {
    nombre: string;
    codigo: string;
    unidad: string;
    ordenid: string;
    cantidad: string;
}

export const Material = model<IMateriales>("Material", MaterialSchema);
