
var http = require('http');
var app =  require('./index.ts');

 var userRoutes = require('./routes/usuario');
 var postRoutes = require('./routes/post');
 var ordenRoutes = require('./routes/ordenes');
 var materialRoutes = require( './routes/materiales');

// import userRoutes from './routes/usuario';
// import postRoutes from './routes/post';
// import ordenRoutes from './routes/ordenes';

var mongoose = require(mongoose);


var port = process.env.PORT || 8080;
app.set('port', port);

var  server = http.createServer(app);

mongoose.connect('mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority',
                (err, respuesta ) => {
                    if( err){
                        throw err;
                    } else {
                        console.log('conexion correcta');
                         server.listen(port, function(){
                            console.log('servidor funcionando');
                         });
                    }
                }  
                
               );

    app.get("/", function(req, res) {
    //when we get an http get request to the root/homepage
        res.send("Hello World");
              });