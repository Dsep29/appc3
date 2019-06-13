"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// modeo del post
const postSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    titulo: {
        type: String
    },
    // debe ir con []
    imgs: [{
            type: String
        }],
    coords: {
        type: String // -13.313123, 12.3123123
    },
    estado: {
        type: String
    },
    comentario: {
        type: String
    },
    comentario1: {
        type: String
    },
    comentario2: {
        type: String
    },
    lugar: {
        type: String
    },
    desarrollo: {
        type: String
    },
    observacion: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario'] // Obligatorio
    }
});
// guardar post
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Post = mongoose_1.model('Post', postSchema);
