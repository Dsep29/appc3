"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MaterialSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        // tslint:disable-next-line: object-literal-sort-keys
        required: [true, "El Nombre es necesario"]
    },
    // tslint:disable-next-line: object-literal-sort-keys
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
        // tslint:disable-next-line: object-literal-sort-keys
        ref: "Orden",
    }
});
exports.Material = mongoose_1.model("Material", MaterialSchema);
