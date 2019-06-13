"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ordenSchema = new mongoose_1.Schema({
    grupo: {
        type: String,
    },
    ztrabajo: {
        type: String,
    },
    hito: {
        type: String,
    },
    fecha: {
        type: Date
    },
    materiales: [{
            type: String,
        }],
    desde: {
        type: String,
    },
    hasta: {
        type: String,
    },
    operarios: {
        type: String,
    },
    imgs: [{
            type: String
        }],
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario'] // Obligatorio
        // default: ['Pendiente']
    },
    posteo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Información necesaria']
    },
    lugar: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    desarrollo: {
        type: String,
    },
});
// obtengo la hora actual
ordenSchema.pre('save', function (next) {
    this.fecha = new Date();
    next();
});
exports.Orden = mongoose_1.model('Orden', ordenSchema);
