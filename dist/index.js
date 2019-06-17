"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const ordenes_1 = __importDefault(require("./routes/ordenes"));
const cors_1 = __importDefault(require("cors"));
const materiales_1 = __importDefault(require("./routes/materiales"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true })); // para importar archivos y usar archivos temp
//config Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
// Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
server.app.use('/orden', ordenes_1.default);
server.app.use('/material', materiales_1.default);
// var port = process.env.PORT || 8080; // linea nueva
// server.app.set('port', port); // linea nueva
// console.log('port:', port);
// server.app.use(express.json());
// Conectar DB mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority
//  mongodb://localhost:27017/fepasa
mongoose_1.default.connect('mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw console.log(err);
    console.log('Base de datos ONLINE');
});
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
server.app.get('/', function (req, res) {
    res.send('Hello World!');
});
//   "scripts": {
//     "start": "nodemon dist/index.js",
//     "start:watch": "nodemon",
//     "prestart:prod": "tsc",
//     "prod": "tsc && nodemon dist/index.js",
//     "build": "tsc",
//     "postinstall": "tsc",
//     "start:prod": "nodemon dist/index.js"
//   },
