"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const orden_model_1 = require("../models/orden.model");
const usuario_model_1 = require("../models/usuario.model");
const userRoutes = express_1.Router(); // rutas consulta usuario
// Login
userRoutes.post("/login", (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                // tslint:disable-next-line: object-literal-sort-keys
                mensaje: "Usuario/contraseña no son correctos"
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                // tslint:disable-next-line: object-literal-sort-keys
                email: userDB.email,
                avatar: userDB.avatar,
                rol: userDB.rol
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                // tslint:disable-next-line: object-literal-sort-keys
                mensaje: "Usuario/contraseña no son correctos ***"
            });
        }
    });
});
// Crear un usuario
userRoutes.post("/create", (req, res) => {
    const user = {
        nombre: req.body.nombre,
        // tslint:disable-next-line: object-literal-sort-keys
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
        rol: req.body.rol
    };
    usuario_model_1.Usuario.create(user).then((userDB) => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            // tslint:disable-next-line: object-literal-sort-keys
            email: userDB.email,
            avatar: userDB.avatar,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch((err) => {
        res.json({
            ok: false,
            // tslint:disable-next-line: object-literal-sort-keys
            err
        });
    });
});
// Actualizar usuario
userRoutes.post("/update", autenticacion_1.verificaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        // tslint:disable-next-line: object-literal-sort-keys
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
        rol: req.body.rol || req.usuario.rol
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                // tslint:disable-next-line: object-literal-sort-keys
                mensaje: "No existe un usuario con ese ID"
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            // tslint:disable-next-line: object-literal-sort-keys
            email: userDB.email,
            avatar: userDB.avatar,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
// ruta de obtener token, datos de usuario
userRoutes.get("/", [autenticacion_1.verificaToken], (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});
// ruta crear Orden
userRoutes.put("/crear-orden", (req, res) => {
    // const usuario = req.userDB.nombre;
    const orden = {
        ubicacion: req.body.ubicacion,
        // tslint:disable-next-line: object-literal-sort-keys
        detalle: req.body.detalle,
        fecha: req.body.fecha,
        comentario: req.body.comentario,
    };
    orden_model_1.Orden.create(orden).then((ordenDB) => {
        // const tokenUser = Token.getJwtToken({
        //     _id: ordenDB._id,
        //     nombre: usuario.nombre,
        //     email: usuario.email,
        //     avatar: usuario.avatar,
        //     rol: usuario.rol
        // });
        res.json({
            ok: true,
            orden: ordenDB,
        });
    }).catch((err) => {
        res.json({
            ok: false,
            // tslint:disable-next-line: object-literal-sort-keys
            err
        });
    });
});
exports.default = userRoutes;
