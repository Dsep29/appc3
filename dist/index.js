"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./classes/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const ordenes_1 = __importDefault(require("./routes/ordenes"));
const post_1 = __importDefault(require("./routes/post"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const materiales_1 = __importDefault(require("./routes/materiales"));
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true })); // para importar archivos y usar archivos temp
// config Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use(express_1.default.static(path_1.default.join(__dirname, "dist")));
// Rutas de mi app
server.app.use("/user", usuario_1.default);
server.app.use("/posts", post_1.default);
server.app.use("/orden", ordenes_1.default);
server.app.use("/material", materiales_1.default);
// var port = process.env.PORT || 5000 ; // linea nueva
// server.app.set('port', port); // linea nueva
// console.log('port:', port);
// server.app.use(express.json());
// server.app.listen(process.env.PORT || 5000 )
// Conectar DB mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority
//  mongodb://localhost:27017/fepasa
mongoose_1.default.connect("mongodb://localhost:27017/fepasa", { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    // tslint:disable-next-line: no-console
    if (err) {
        throw console.log(err);
    }
    // tslint:disable-next-line: no-console
    console.log("Base de datos ONLINE");
});
// Levantar express
server.start(() => {
    // tslint:disable-next-line: no-console
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
// tslint:disable-next-line: only-arrow-functions
server.app.get("/", function (req, res) {
    res.send("Hello World!");
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
