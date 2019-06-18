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
const materiales_model_1 = require("../models/materiales.model");
const materialRoutes = express_1.Router(); // servidor xpress
const fileSystem = new file_system_1.default();
materialRoutes.post("/crear", autenticacion_1.verificaToken, (req, resp) => {
    const body = req.body; // obtengo info del body html
    // modelo
    materiales_model_1.Material.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
        // insertamos sin mostrar la psswd
        // await postDB.populate('usuario', '-password').populate('post').execPopulate();
        resp.json({
            ok: true,
            // tslint:disable-next-line: object-literal-sort-keys
            Materiales: postDB
        });
    })).catch((err) => {
        resp.json(err);
    });
});
materialRoutes.get("/getmaterial", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // paginacion
    // let pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    // let skip = pagina - 1;
    // skip = skip * 10;
    // mostrar los post
    const material = yield materiales_model_1.Material.find().exec();
    res.json({
        ok: true,
        // tslint:disable-next-line: object-literal-sort-keys
        material
    });
}));
materialRoutes.get("/mostrar/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // mostrar los post
    const id = req.params.id;
    const material = yield materiales_model_1.Material.find({ ordenid: id }).exec();
    res.json({
        material
    });
}));
materialRoutes.put("/eliminar/:id/:nombre", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // mostrar los post
    const id = req.params.id;
    const name = req.params.nombre;
    const del = materiales_model_1.Material.remove({ ordenid: id, nombre: name }).exec();
    res.json({
        del
    });
}));
exports.default = materialRoutes;
