const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);
// const io = socketio.listen(server);

// rutas
import userRoutes from './routes/usuario';
// import postRoutes from './routes/post';
// import ordenRoutes from './routes/ordenes';
// import materialRoutes from './routes/materiales';

// const userRoutes = require( './routes/usuarios');

 // Rutas de mi app
server.app.use('/user', userRoutes );
// server.app.use('/posts', postRoutes );
// server.app.use('/orden', ordenRoutes );
// server.app.use('/material', materialRoutes );

mongoose.connect('mongodb+srv://Diego:Avondale15@fepasa-j0qfp.mongodb.net/test?retryWrites=true&w=majority',
                  { useNewUrlParser: true, useCreateIndex: true })
                .then( db => console.log( 'base de datos conectada', db))
                .catch( err => console.log(err));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), ()=>{
    console.log(`server port: ${app.get('port')}` );    
});

app.get("/", function(req, res) {
    //when we get an http get request to the root/homepage
    res.send("Hello World");
  });

  
