"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_system_1 = __importDefault(require("../classes/file-system"));
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const postRoutes = express_1.Router(); // servidor xpress
const fileSystem = new file_system_1.default();
// Obtener POST paginados
postRoutes.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;
    // mostrar los post
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 }) // desc
        .skip(skip) // paginacion  o salto de pagina
        .limit(10) // cantidad
        .populate("usuario", "-password") // datos usuario -passwd
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
// Crear POST
postRoutes.post("/", [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body; // obtengo info del body html
    body.usuario = req.usuario._id; // para identificar quien hace el post
    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs = imagenes;
    // modelo
    post_model_1.Post.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
        // insertamos sin mostrar la psswd
        yield postDB.populate("usuario", "-password").execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch((err) => {
        res.json(err);
    });
});
// Servicio para subir archivos
postRoutes.post("/upload", [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    // validaciones
    if (!req.files) { // no hay archivo en la ruta
        return res.status(400).json({
            ok: false,
            // tslint:disable-next-line: object-literal-sort-keys
            mensaje: "No se subió ningun archivo"
        });
    }
    const file = req.files.image; // viene de la interface file-upload
    if (!file) {
        return res.status(400).json({
            ok: false,
            // tslint:disable-next-line: object-literal-sort-keys
            mensaje: "No se subió ningun archivo - image"
        });
    }
    if (!file.mimetype.includes("image")) {
        return res.status(400).json({
            ok: false,
            // tslint:disable-next-line: object-literal-sort-keys
            mensaje: "Lo que subió no es una imagen"
        });
    }
    yield fileSystem.guardarImagenTemporal(file, req.usuario._id);
    res.json({
        ok: true,
        // tslint:disable-next-line: object-literal-sort-keys
        file: file.mimetype
    });
}));
// obtengo la imagen para mostrar en los post
postRoutes.get("/imagen/:userid/:img", (req, res) => {
    // obtengo las imagenes
    const userId = req.params.userid;
    const img = req.params.img;
    // construyo el path
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    res.sendFile(pathFoto); // envio el path
});
// get post Pendientes
postRoutes.get("/pendientes", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;
    // mostrar los post
    const posts = yield post_model_1.Post.find({ estado: "pendiente" })
        .sort({ _id: -1 }) // desc
        .skip(skip) // paginacion  o salto de pagina
        .limit(10) // cantidad
        .populate("usuario", "-password") // datos usuario -passwd
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
// get post en proceso
postRoutes.get("/proceso", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;
    // mostrar los post
    const posts = yield post_model_1.Post.find({ estado: "proceso" })
        .sort({ _id: -1 }) // desc
        .skip(skip) // paginacion  o salto de pagina
        .limit(10) // cantidad
        .populate("usuario", "-password") // datos usuario -passwd
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
// get post por estado
postRoutes.get("/terminado/:estado", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;
    const est = req.params.estado;
    // mostrar los post
    const posts = yield post_model_1.Post.find({ estado: est })
        .sort({ _id: -1 }) // desc
        .skip(skip) // paginacion  o salto de pagina
        .limit(10) // cantidad
        .populate("usuario", "-password") // datos usuario -passwd
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
// actualizar post by Id
postRoutes.put("/updatePost/:posteoID", autenticacion_1.verificaToken, (req, res) => {
    const postId = req.params.posteoID;
    const update = req.body;
    post_model_1.Post.findByIdAndUpdate(postId, update, (err, postDB) => {
        if (err) {
            throw err;
        }
        if (!postDB) {
            return res.json({
                ok: false,
                // tslint:disable-next-line: object-literal-sort-keys
                mensaje: "No existe un usuario con ese ID"
            });
        }
        res.json({
            ok: true,
            postDB
        });
    });
});
// get post by ID
postRoutes.get("/posteo/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const posteo = req.params.id;
    // mostrar los post
    const posts = yield post_model_1.Post.find({ _id: posteo }).exec();
    res.json({
        ok: true,
        posts
    });
}));
// buscar post por fechas
postRoutes.post("/buscar", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const inicio = new Date(req.body.inicio);
    const fin = new Date(req.body.fin);
    const query = {
        created: {
            $gte: inicio,
            $lt: fin
        }
    };
    // hacemos el llamado directamente al metodo find() y le pasamos una función callback
    yield post_model_1.Post.find(query, (error, ordenes) => {
        // tslint:disable-next-line: no-console
        console.log("desde query", ordenes);
        if (error) {
            // tslint:disable-next-line: no-console
            console.log(error);
            return res.status(500).json({
                ok: false,
                // tslint:disable-next-line: object-literal-sort-keys
                error
            });
        }
        return res.status(200).json({
            ok: true,
            ordenes
        });
    });
}));
exports.default = postRoutes;
