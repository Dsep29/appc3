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
const orden_model_1 = require("../models/orden.model");
const ordenRoutes = express_1.Router(); // servidor xpress
const fileSystem = new file_system_1.default();
// subir fotos orden
ordenRoutes.post("/upload/orden", [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
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
    yield fileSystem.guardarImagenTemporalOrden(file, req.usuario._id);
    res.json({
        ok: true,
        // tslint:disable-next-line: object-literal-sort-keys
        file: file.mimetype
    });
}));
// crear Orden
ordenRoutes.post("/", [autenticacion_1.verificaToken], (req, resp) => {
    const body = req.body; // obtengo info del body html
    body.usuario = req.usuario._id; // para identificar quien hace el post
    body.post = req.dataPost;
    const imagenes = fileSystem.imagenesDeTempHaciaOrden(req.usuario._id);
    body.imgs = imagenes;
    // modelo
    orden_model_1.Orden.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
        // insertamos sin mostrar la psswd
        yield postDB.populate("usuario", "-password").populate("post").execPopulate();
        resp.json({
            ok: true,
            // tslint:disable-next-line: object-literal-sort-keys
            Orden: postDB
        });
    })).catch((err) => {
        resp.json(err);
    });
});
ordenRoutes.get("/orden/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;
    const id = req.params.id;
    // mostrar los post
    const posts = yield orden_model_1.Orden.find({ _id: id })
        .sort({ _id: -1 }) // desc
        .skip(skip) // paginacion  o salto de pagina
        .limit(10) // cantidad
        // .populate('usuario', '-password')// datos usuario -passwd
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
// actualizar orden by Id
ordenRoutes.put("/updateOrden/:ordenID", autenticacion_1.verificaToken, (req, res) => {
    const postId = req.params.ordenID;
    const update = req.body;
    const query = { posteo: postId };
    orden_model_1.Orden.findOneAndUpdate(query, update, (err, ordDB) => {
        if (err) {
            throw err;
        }
        if (!ordDB) {
            return res.json({
                ok: false,
                // tslint:disable-next-line: object-literal-sort-keys
                mensaje: "No existe un Orden con ese ID"
            });
        }
        res.json({
            ok: true,
            ordDB
        });
    });
});
// buscar ordenes por id de posteo
ordenRoutes.get("/verordenes/:idpost", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // paginacion
    // let pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    // let skip = pagina - 1;
    // skip = skip * 10;
    const idposteo = req.params.idpost;
    // mostrar los post
    const ordenes = yield orden_model_1.Orden.findOne({ posteo: idposteo })
        .sort({ _id: -1 }) // desc
        // .skip( skip ) //paginacion  o salto de pagina
        .limit(10) // cantidad
        .exec();
    if (!ordenes) {
        return res.json({
            ok: false,
            // tslint:disable-next-line: object-literal-sort-keys
            mensaje: "No existe un Orden con ese ID de Post"
        });
    }
    res.json({
        ok: true,
        ordenes
    });
}));
ordenRoutes.post("/buscar", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const inicio = new Date(req.body.inicio);
    const fin = new Date(req.body.fin);
    const query = {
        fecha: {
            $gte: inicio,
            $lt: fin
        }
    };
    // // hacemos el llamado directamente al metodo find() y le pasamos una función callback
    //  await Orden.find(query, (error, ordenes) => {
    //   if(error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       ok: false,
    //       error
    //     });
    //   }
    //   return res.status(200).json({
    //     ok: true,
    //     ordenes
    //   });
    // });
    yield orden_model_1.Orden.find(query).then((resp) => {
        return res.status(200).json({
            ok: true,
            resp
        });
    });
}));
exports.default = ordenRoutes;
