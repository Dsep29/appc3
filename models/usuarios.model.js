
const Schema = require('mongoose');
const model= require('mongoose');
const Document = require('mongoose');
const bcrypt = require('bcrypt');


const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario' ]
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es necesaria']
    },
    rol: {
        type: String,
        required: [ true, 'El Rol es necesario']
    }

});


usuarioSchema.method('compararPassword', function( password = '') {

    if (  bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});

// interface IUsuario extends Document {
//     nombre: string;
//     email: string;
//     password: string;
//     avatar: string;
//     rol: string;

//     compararPassword(password);
// }



// export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
module.exports = model('Usuario', usuarioSchema);
