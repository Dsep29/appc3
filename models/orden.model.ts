import { Document, model, Schema } from "mongoose";

const ordenSchema = new Schema({

    grupo: {
        type: String,
        // required: [ true, 'El grupo es necesario' ]
    },
    ztrabajo: {
        type: String,
        // required: [ true, 'Información necesaria' ]
    },
// tslint:disable-next-line: object-literal-sort-keys
    hito: {
        type: String,
        // required: [ true, 'Información Necesaria' ]
    },
    fecha: {
        type: Date
    },
    materiales: [{
        type: String,
        // default: ['Pendiente']
    }],
    desde: {
        type: String,
        // required: [ true, 'Necesita información']
    },
    hasta: {
        type: String,
        // required: [ true, 'Necesita información']
    },
    operarios: {
        type: String,
        // required: [ true, 'Necesita información']
    },
    imgs: [{
        type: String
    }],
    usuario: {
        type: Schema.Types.ObjectId,
// tslint:disable-next-line: object-literal-sort-keys
        ref: "Usuario",
        required: [ true, "Debe de existir una referencia a un usuario" ] // Obligatorio
        // default: ['Pendiente']
    },
    posteo: {
        type: Schema.Types.ObjectId,
// tslint:disable-next-line: object-literal-sort-keys
        ref: "Post",
        required: [ true, "Información necesaria" ]

    },
    lugar: {
        type: String,
        // required: [ true, 'Necesita información']
    },
    observaciones: {
        type: String,
        // required: [ true, 'Necesita información']
    },
    desarrollo: {
        type: String,
        // required: [ true, 'Necesita información']
    },

});

interface IOrden extends Document {
    grupo: string;
    ztrabajo: string;
    hito: string;
    fecha: Date;
    materiales: string[];
    desde: string;
    hasta: string;
    operarios: string;
    imgs: string[];
    usuario: string;
    posteo: string;
    lugar: string;
    observaciones: string;
    desarrollo: string;
}

// obtengo la hora actual
ordenSchema.pre<IOrden>("save", function( next ) {
    this.fecha = new Date();
    next();
});

export const Orden = model<IOrden>("Orden", ordenSchema);
