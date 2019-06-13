import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import FileSystem from '../classes/file-system';
import { Orden } from '../models/orden.model';
import { FileUpload } from '../interfaces/file-upload';
import { clearScreenDown } from 'readline';
import { isDate } from 'util';


const ordenRoutes = Router(); // servidor xpress

const fileSystem = new FileSystem();

// subir fotos orden
ordenRoutes.post( '/upload/orden', [verificaToken], async (req: any, res: Response) => {
    //validaciones
    if ( !req.files ) { // no hay archivo en la ruta
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image; // viene de la interface file-upload

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        }); 
    }

    await fileSystem.guardarImagenTemporalOrden( file, req.usuario._id );

    res.json({
        ok: true,
        file: file.mimetype
    });

});


// crear Orden
ordenRoutes.post('/', [verificaToken], (req: any, resp: Response) =>{

    const body = req.body; // obtengo info del body html
    body.usuario = req.usuario._id; // para identificar quien hace el post
    body.post = req.dataPost

    const imagenes = fileSystem.imagenesDeTempHaciaOrden( req.usuario._id );
    body.imgs = imagenes;

    // modelo 
    Orden.create( body ).then( async postDB => {
      // insertamos sin mostrar la psswd
        await postDB.populate('usuario', '-password').populate('post').execPopulate();      

        resp.json({
            ok: true,
            Orden: postDB
        });

    }).catch( err => {
        resp.json(err)
    });
});

ordenRoutes.get('/orden/:id', async (req: any, res: Response) =>{

    // paginacion
    let pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;

    const id = req.params.id

    // mostrar los post
    const posts = await Orden.find({_id: id})
                            .sort({ _id: -1 }) // desc
                            .skip( skip ) //paginacion  o salto de pagina
                            .limit(10) //cantidad
                            // .populate('usuario', '-password')// datos usuario -passwd
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});

  // actualizar orden by Id
ordenRoutes.put('/updateOrden/:ordenID', verificaToken, (req, res) =>{
    let postId  = req.params.ordenID;
    let update = req.body;
    let query = { posteo: postId}
   
    Orden.findOneAndUpdate( query, update, ( err, ordDB) =>{
        if ( err) throw err
   
        if ( !ordDB ){
           return res.json({
               ok: false,
               mensaje: 'No existe un Orden con ese ID'
           });
       }
       res.json({
           ok: true,
           ordDB
       });
    });
   });

   // buscar ordenes por id de posteo
ordenRoutes.get('/verordenes/:idpost',  async (req: any, res: Response) =>{

    // paginacion
    // let pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    // let skip = pagina - 1;
    // skip = skip * 10;
    const idposteo = req.params.idpost
    // mostrar los post
    const ordenes = await Orden.findOne({posteo: idposteo})
                            .sort({ _id: -1 }) // desc
                            //.skip( skip ) //paginacion  o salto de pagina
                            .limit(10) //cantidad
                            .exec();

        if( !ordenes){
          return res.json({
            ok: false,
            mensaje: 'No existe un Orden con ese ID de Post'
        });
        }

    res.json({
        ok: true,
        ordenes
    });
    

});

ordenRoutes.post('/buscar',  async(req: any, res: Response) => {

    const inicio = new Date(req.body.inicio);
    const fin = new Date(req.body.fin);
    const query = { // <- construimos nuestro documento query
      fecha: {
        $gte: inicio,
        $lt: fin
      }
    };
    // // hacemos el llamado directamente al metodo find() y le pasamos una función callback
    //  await Orden.find(query, (error, ordenes) => {
    //   if(error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       ok: false,
    //       error
    //     });
    //   }
    //   return res.status(200).json({
    //     ok: true,
    //     ordenes
    //   });
    // });
    
     await Orden.find( query).then( resp =>{

        return res.status(200).json({
                ok : true,
                resp
              });

    })

});



export default ordenRoutes;