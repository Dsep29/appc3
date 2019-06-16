const express = require('index');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);

// rutas
 // const userRoutes = require('./routes/usuarios');
// import postRoutes from './routes/post';
// import ordenRoutes from './routes/ordenes';
// import materialRoutes from './routes/materiales';

// const userRoutes = require( './routes/usuarios');

  // Rutas de mi app
 // server.app.use('/user', userRoutes );
//  server.app.use('/posts', postRoutes );
//  server.app.use('/orden', ordenRoutes );
//  server.app.use('/material', materialRoutes ); mongodb://localhost:27017/fepasa
 //  mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority',
                  { useNewUrlParser: true, useCreateIndex: true })
                .then( db => console.log( 'base de datos conectada', db))
                .catch( err => console.log(err));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'index')));

server.listen(app.get('port'), ()=>{
    console.log(`server port: ${app.get('port')}` );    
});


// inicio
app.get("/", function(req, res) {
    //when we get an http get request to the root/homepage
    res.send("Hello World");
  });

  

  
