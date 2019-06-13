var http = require('http');
var express  = require('express');
var app =  express();

 var userRoutes = require('./routes/usuario.ts');
 var postRoutes = require('./routes/post.ts');
 var ordenRoutes = require('./routes/ordenes.ts');
 var materialRoutes = require( './routes/materiales.ts');

 var bodyParser = require('body-parser');
 var fileUpload = require('express-fileupload');
 var Cors = require('cors');

// import userRoutes from './routes/usuario';
// import postRoutes from './routes/post';
// import ordenRoutes from './routes/ordenes';

var mongoose = require(mongoose);
var server = http.createServer(app);

// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) ); // para importar archivos y usar archivos temp

//config Cors
server.app.use( Cors({ origin:true, credentials: true}) );

// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );
server.app.use('/orden', ordenRoutes );
server.app.use('/material', materialRoutes );


var port = process.env.PORT || 8080;
app.set('port', port);

mongoose.connect('mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority')
                .then( db => console.log( 'base de datos conectada', db))
                .catch( err => console.log(err));

                
               

    app.get("/", function(req, res) {
    //when we get an http get request to the root/homepage
        res.send("Hello World");
              });