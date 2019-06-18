
import bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, "El nombre es necesario" ]
    },
    avatar: {
        type: String,
        default: "av-1.png"
    },
    email: {
        type: String,
        unique: true,
        required: [ true, "El correo es necesario" ]
    },
    password: {
        type: String,
        required: [ true, "La contraseña es necesaria"]
    },
    rol: {
        type: String,
        required: [ true, "El Rol es necesario"]
    }

});

usuarioSchema.method("compararPassword", function( password: string = ""): boolean {

    if (  bcrypt.compare( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    rol: string;

    compararPassword(password: string): boolean;
}

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);
