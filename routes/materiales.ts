import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import FileSystem from '../classes/file-system';
import { Material } from '../models/materiales.model';


const materialRoutes = Router(); // servidor xpress

const fileSystem = new FileSystem();



materialRoutes.post('/crear', verificaToken,  (req: any, resp: Response) =>{

    const body = req.body; // obtengo info del body html
       // modelo 
    Material.create( body ).then( async postDB => {
        // insertamos sin mostrar la psswd
        // await postDB.populate('usuario', '-password').populate('post').execPopulate();  
            resp.json({
            ok: true,
            Materiales: postDB
        });

    }).catch( err => {
        resp.json(err)
    });


});

materialRoutes.get('/getmaterial', async (req: any, res: Response) => {
    // paginacion
    // let pagina = Number(req.query.pagina) || 1; // especifico la pagina 1 si no hay
    // let skip = pagina - 1;
    // skip = skip * 10;

    // mostrar los post
    const material = await Material.find().exec();

    res.json({
        ok: true,
        material
    });
});

materialRoutes.get('/mostrar/:id', async (req: any, res: Response) => {    

    // mostrar los post
    const id = req.params.id;
    
    const material = await Material.find({ordenid:id}).exec();
   
    res.json({
        material
    });


});

materialRoutes.put('/eliminar/:id/:nombre', async (req: any, res: Response) => {    

    // mostrar los post
    const id = req.params.id;
    const name = req.params.nombre
    
 const del  = Material.remove({ordenid:id, nombre:name}).exec(); 

 res.json({
    del
});

});

export default materialRoutes;