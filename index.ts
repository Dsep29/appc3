import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import ordenRoutes from './routes/ordenes';

import Cors from 'cors';
import materialRoutes from './routes/materiales';
import express from 'express';
import { join } from 'path';
import path from 'path';


// var app = express();
// var server = http.createServer(app);
// var serve = new http.Server(app);


const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) ); // para importar archivos y usar archivos temp

//config Cors

server.app.use( Cors({ origin:true, credentials: true}) );

server.app.use(express.static(path.join(__dirname, 'dist')));

// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );
server.app.use('/orden', ordenRoutes );
server.app.use('/material', materialRoutes );

// var port = process.env.PORT || 8080; // linea nueva
// server.app.set('port', port); // linea nueva
// console.log('port:', port);
// server.app.use(express.json());


// Conectar DB mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority
//  mongodb://localhost:27017/fepasa
mongoose.connect('mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority', 
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

   if ( err ) throw  console.log(err);
   console.log('Base de datos ONLINE');
});

// const CLIENT_FILES = join(__dirname, '..', '..', 'client', 'dist');


//Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});

// server.app.get('/', function (req, res) {
//     res.send('Hello World!');
//   });

  // parte del script de Json = "test": "echo \"Error: no test specified\" && exit 1",
  
