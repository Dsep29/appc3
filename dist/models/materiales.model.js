"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MaterialSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario']
    },
    codigo: {
        type: String,
    },
    unidad: {
        type: String,
    },
    cantidad: {
        type: String,
    },
    ordenid: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Orden',
    }
});
exports.Material = mongoose_1.model('Material', MaterialSchema);
