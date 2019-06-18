"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        // tslint:disable-next-line: object-literal-sort-keys
        required: [true, "El nombre es necesario"]
    },
    // tslint:disable-next-line: object-literal-sort-keys
    avatar: {
        type: String,
        // tslint:disable-next-line: object-literal-sort-keys
        default: "av-1.png"
    },
    email: {
        type: String,
        unique: true,
        // tslint:disable-next-line: object-literal-sort-keys
        required: [true, "El correo es necesario"]
    },
    password: {
        type: String,
        // tslint:disable-next-line: object-literal-sort-keys
        required: [true, "La contraseña es necesaria"]
    },
    rol: {
        type: String,
        // tslint:disable-next-line: object-literal-sort-keys
        required: [true, "El Rol es necesario"]
    }
});
usuarioSchema.method("compararPassword", function (password = "") {
    if (bcrypt_1.default.compare(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model("Usuario", usuarioSchema);
