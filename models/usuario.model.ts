
import bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";

const usuarioSchema = new Schema({

    nombre: {
        type: String,
// tslint:disable-next-line: object-literal-sort-keys
        required: [ true, "El nombre es necesario" ]
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
        required: [ true, "El correo es necesario" ]
    },
    password: {
        type: String,
// tslint:disable-next-line: object-literal-sort-keys
        required: [ true, "La contraseña es necesaria"]
    },
    rol: {
        type: String,
// tslint:disable-next-line: object-literal-sort-keys
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
