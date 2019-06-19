import mongoose from "mongoose";
import Server from "./classes/server";

import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import ordenRoutes from "./routes/ordenes";
import postRoutes from "./routes/post";
import userRoutes from "./routes/usuario";

import Cors from "cors";
import express from "express";
import path from "path";
import materialRoutes from "./routes/materiales";

const server = new Server();

// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) ); // para importar archivos y usar archivos temp

// config Cors

server.app.use( Cors({ origin: true, credentials: true}) );

server.app.use(express.static(path.join(__dirname, "dist")));

// Rutas de mi app
server.app.use("/user", userRoutes );
server.app.use("/posts", postRoutes );
server.app.use("/orden", ordenRoutes );
server.app.use("/material", materialRoutes );

// var port = process.env.PORT || 5000 ; // linea nueva
// server.app.set('port', port); // linea nueva
// console.log('port:', port);
// server.app.use(express.json());
// server.app.listen(process.env.PORT || 5000 )

// Conectar DB mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority
//  mongodb://localhost:27017/fepasa
mongoose.connect("mongodb://localhost:27017/fepasa",
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

// tslint:disable-next-line: no-console
   if ( err ) { throw  console.log(err); }
// tslint:disable-next-line: no-console
   console.log("Base de datos ONLINE");
});

// Levantar express
server.start( () => {
// tslint:disable-next-line: no-console
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});

// tslint:disable-next-line: only-arrow-functions
// server.app.get("/", function(req, res) {
//     res.send("Hello World!");
//   });

//   "scripts": {
//     "start": "nodemon dist/index.js",
//     "start:watch": "nodemon",
//     "prestart:prod": "tsc",
//     "prod": "tsc && nodemon dist/index.js",
//     "build": "tsc",
//     "postinstall": "tsc",
//     "start:prod": "nodemon dist/index.js"
//   },
