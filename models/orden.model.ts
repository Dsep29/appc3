import { Schema, model, Document } from 'mongoose';

const ordenSchema = new Schema({

    grupo: {
        type: String,
        // required: [ true, 'El grupo es necesario' ]
    },
    ztrabajo: {
        type: String,
        // required: [ true, 'Información necesaria' ]
    },
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
    imgs:[{
        type: String
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ] // Obligatorio
        // default: ['Pendiente']
    },
    posteo: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [ true, 'Información necesaria' ]
        
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
    grupo: String,
    ztrabajo: String,
    hito: String,
    fecha: Date,
    materiales: String[],
    desde: String,
    hasta: String,
    operarios:String,
    imgs: String[],
    usuario: String,
    posteo: String,
    lugar: String,
    observaciones: String,
    desarrollo: String
}

// obtengo la hora actual
ordenSchema.pre<IOrden>('save', function( next ) {
    this.fecha = new Date();
    next();
});

export const Orden = model<IOrden>('Orden', ordenSchema);