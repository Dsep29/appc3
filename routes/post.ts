import { Response, Router } from "express";
import FileSystem from "../classes/file-system";
import { FileUpload } from "../interfaces/file-upload";
import { verificaToken } from "../middlewares/autenticacion";
import { Post } from "../models/post.model";

const postRoutes = Router(); // servidor xpress

const fileSystem = new FileSystem();

// Obtener POST paginados
postRoutes.get("/", async (req: any, res: Response) => {
    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;

    // mostrar los post
    const posts = await Post.find()
                            .sort({ _id: -1 }) // desc
                            .skip( skip ) // paginacion  o salto de pagina
                            .limit(10) // cantidad
                            .populate("usuario", "-password")// datos usuario -passwd
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});

// Crear POST
postRoutes.post("/", [ verificaToken ], (req: any, res: Response) => {

    const body = req.body; // obtengo info del body html
    body.usuario = req.usuario._id; // para identificar quien hace el post

    const imagenes = fileSystem.imagenesDeTempHaciaPost( req.usuario._id );
    body.imgs = imagenes;

    // modelo
    Post.create( body ).then( async (postDB) => {
      // insertamos sin mostrar la psswd
        await postDB.populate("usuario", "-password").execPopulate();

        res.json({
            ok: true,
            post: postDB
        });

    }).catch( (err) => {
        res.json(err);
    });

});
// Servicio para subir archivos
postRoutes.post( "/upload", [ verificaToken ], async (req: any, res: Response) => {
    // validaciones
    if ( !req.files ) { // no hay archivo en la ruta
        return res.status(400).json({
            ok: false,
            mensaje: "No se subió ningun archivo"
        });
    }

    const file: FileUpload = req.files.image; // viene de la interface file-upload

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: "No se subió ningun archivo - image"
        });
    }

    if ( !file.mimetype.includes("image") ) {
        return res.status(400).json({
            ok: false,
            mensaje: "Lo que subió no es una imagen"
        });
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id );

    res.json({
        ok: true,
        file: file.mimetype
    });

});
// obtengo la imagen para mostrar en los post
postRoutes.get("/imagen/:userid/:img", (req: any, res: Response) => {

    // obtengo las imagenes
    const userId = req.params.userid;
    const img    = req.params.img;

    // construyo el path
    const pathFoto = fileSystem.getFotoUrl( userId, img );

    res.sendFile( pathFoto ); // envio el path

});

// get post Pendientes
postRoutes.get("/pendientes", async (req: any, res: Response) => {

    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;

    // mostrar los post
    const posts = await Post.find({estado: "pendiente"})
                            .sort({ _id: -1 }) // desc
                            .skip( skip ) // paginacion  o salto de pagina
                            .limit(10) // cantidad
                            .populate("usuario", "-password")// datos usuario -passwd
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});
    // get post en proceso
postRoutes.get("/proceso", async (req: any, res: Response) => {

    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;

    // mostrar los post
    const posts = await Post.find({estado: "proceso"})
                            .sort({ _id: -1 }) // desc
                            .skip( skip ) // paginacion  o salto de pagina
                            .limit(10) // cantidad
                            .populate("usuario", "-password")// datos usuario -passwd
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});
// get post por estado
postRoutes.get("/terminado/:estado", async (req: any, res: Response) => {

    // paginacion
    const pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    let skip = pagina - 1;
    skip = skip * 10;
    const est = req.params.estado;

    // mostrar los post
    const posts = await Post.find({estado: est })
                            .sort({ _id: -1 }) // desc
                            .skip( skip ) // paginacion  o salto de pagina
                            .limit(10) // cantidad
                            .populate("usuario", "-password")// datos usuario -passwd
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});
  // actualizar post by Id
postRoutes.put("/updatePost/:posteoID", verificaToken, (req, res) => {
 const postId  = req.params.posteoID;
 const update = req.body;

 Post.findByIdAndUpdate(postId, update, ( err, postDB) => {
     if ( err) { throw err; }

     if ( !postDB ) {
        return res.json({
            ok: false,
            mensaje: "No existe un usuario con ese ID"
        });
    }
     res.json({
        ok: true,
        postDB
    });
 });
});
// get post by ID
postRoutes.get("/posteo/:id", async (req: any, res: Response) => {

    const posteo = req.params.id;
    // mostrar los post
    const posts = await Post.find({_id: posteo }).exec();
    res.json({
        ok: true,
        posts
    });

});
// buscar post por fechas
postRoutes.post("/buscar",  async (req: any, res: Response) => {
    const inicio = new Date(req.body.inicio);
    const fin = new Date(req.body.fin);
    const query = { // <- construimos nuestro documento query
      created: {
        $gte: inicio,
        $lt: fin
      }
    };
    // hacemos el llamado directamente al metodo find() y le pasamos una función callback
    await Post.find(query, (error, ordenes) => {
        console.log("desde query", ordenes);
        if (error) {
        console.log(error);
        return res.status(500).json({
          ok: false,
          error
        });
      }
        return res.status(200).json({
        ok: true,
        ordenes
      });
    });
});

export default postRoutes;
