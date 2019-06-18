
import { Document, model, Schema } from "mongoose";

// modeo del post
const postSchema = new Schema({
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
    coords: {           // geo
        type: String   // -13.313123, 12.3123123
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
    usuario: { // relacion Usuario
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [ true, "Debe de existir una referencia a un usuario" ] // Obligatorio
    }

});

// guardar post
postSchema.pre<IPost>("save", function( next ) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    mensaje: string;
    titulo: string;
    img: string[];
    coords: string;
    usuario: string;
    estado: string;
    comentario: string;
    comentario1: string;
    comentario2: string;
}

export const Post = model<IPost>("Post", postSchema);
