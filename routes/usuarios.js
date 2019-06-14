const  Router, Request, Response = require('express');
const  Usuario  = require('../models/usuario.model') ;
const  bcrypt = require('bcrypt') ;
const  Token = require('../classes/token');
const  verificaToken  = require('../middlewares/autenticacion') ;
const  Orden  = require('../models/orden.model');

const userRoutes = Router(); // rutas consulta usuario

// Login
userRoutes.post('/login', (req, res ) => {
    const body = req.body;
   
    Usuario.findOne({ email: body.email }, ( err, userDB ) => {
             
        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if ( userDB.compararPassword( body.password ) ) {
               const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar,
                rol: userDB.rol
            });
           
            res.json({
                ok: true,
                token: tokenUser                                
               });

        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***'
            });
        }
    })
});

// Crear un usuario
userRoutes.post('/create', ( req: Request, res: Response ) => {

    const user = {
        nombre   : req.body.nombre,
        email    : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
        avatar   : req.body.avatar,
        rol      : req.body.rol
    };

    Usuario.create( user ).then( userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
            rol: userDB.rol
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
});

// Actualizar usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email : req.body.email  || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
        rol: req.body.rol       || req.usuario.rol
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
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
userRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});

// ruta crear Orden
userRoutes.put('/crear-orden',  ( req: any, res: Response ) => {
    // const usuario = req.userDB.nombre;

    const orden = {
        ubicacion   : req.body.ubicacion,
        detalle     : req.body.detalle,
        fecha       : req.body.fecha,
        comentario  : req.body.comentario,
        // creador     : 
    };

    Orden.create( orden ).then( ordenDB => {

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
            // token: tokenUser
        });

    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
});


export default userRoutes;