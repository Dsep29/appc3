import { FileUpload } from "../interfaces/file-upload";

// prop. node
import fs from "fs";
import path from "path";
import uniqid from "uniqid";

export default class FileSystem {


    constructor() { }
    public guardarImagenTemporal( file: FileUpload, userId: string ) {

        return new Promise(  (resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaUsuario( userId );

            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico( file.name );

            // Mover el archivo del Temp a nuestra carpeta
            file.mv( `${ path }/${ nombreArchivo }`, ( err: any) => {

                if ( err ) {
                    reject(err);
                } else {
                    resolve();
                }

            });

        });
    }

    public imagenesDeTempHaciaPost( userId: string ) {

        const pathTemp = path.resolve(  __dirname, "../uploads/", userId, "temp" );
        const pathPost = path.resolve(  __dirname, "../uploads/", userId, "posts" );

        if ( !fs.existsSync( pathTemp ) ) {
            return [];
        }

        if ( !fs.existsSync( pathPost ) ) {
            fs.mkdirSync( pathPost );
        }

        const imagenesTemp = this.obtenerImagenesEnTemp( userId );

        imagenesTemp.forEach( (imagen) => {
            fs.renameSync( `${ pathTemp }/${ imagen }`, `${ pathPost }/${ imagen }` ); // cambiar de temp a uploads
        });

        return imagenesTemp;

    }

    public getFotoUrl( userId: string, img: string ) { // metodo de file-systems

        // Path POSTs
        const pathFoto = path.resolve( __dirname, "../uploads", userId, "posts", img );

        // Si la imagen existe
        const existe = fs.existsSync( pathFoto ); // pregunto si la ruta existe
        if ( !existe ) {
            return path.resolve( __dirname, "../assets/400x250.jpg" ); // error de imagen
        }

        return pathFoto; // construccion de la foto

    }

    public imagenesDeTempHaciaOrden( ordenId: string ) {

        const pathTemp = path.resolve(  __dirname, "../uploads/orden", ordenId, "temp" );
        const pathPost = path.resolve(  __dirname, "../uploads/orden", ordenId, "orden" );

        if ( !fs.existsSync( pathTemp ) ) {
            return [];
        }

        if ( !fs.existsSync( pathPost ) ) {
            fs.mkdirSync( pathPost );
        }

        const imagenesTemp = this.obtenerImagenesEnTempOrden( ordenId );

        imagenesTemp.forEach( (imagen) => {
            fs.renameSync( `${ pathTemp }/${ imagen }`, `${ pathPost }/${ imagen }` ); // cambiar de temp a uploads
        });

        return imagenesTemp;

    }

    public getFotoUrlOrden( userId: string, img: string ) { // metodo de file-systems

        // Path POSTs
        const pathFoto = path.resolve( __dirname, "../uploads/orden", userId, "posts", img );

        // Si la imagen existe
        const existe = fs.existsSync( pathFoto ); // pregunto si la ruta existe
        if ( !existe ) {
            return path.resolve( __dirname, "../assets/400x250.jpg" ); // error de imagen
        }

        return pathFoto; // construccion de la foto

    }

    public guardarImagenTemporalOrden( file: FileUpload, ordenId: string ) {

        return new Promise(  (resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaOrden( ordenId );

            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico( file.name );

            // Mover el archivo del Temp a nuestra carpeta
            file.mv( `${ path }/${ nombreArchivo }`, ( err: any) => {

                if ( err ) {
                    reject(err);
                } else {
                    resolve();
                }

            });

        });
    }

    private generarNombreUnico( nombreOriginal: string ) {
        // 6.copy.jpg obtener la extension
        const nombreArr = nombreOriginal.split(".");
        const extension = nombreArr[ nombreArr.length - 1 ];

        const idUnico = uniqid(); // id unico para los archivos

        return `${ idUnico }.${ extension }`; // retornamos el nuevo id
    }

    private crearCarpetaUsuario( userId: string ) {

        const pathUser = path.resolve(  __dirname, "../uploads/", userId ); // __dirname me trae la ruta
        const pathUserTemp = pathUser + "/temp";
        // console.log(pathUser);

        const existe = fs.existsSync( pathUser );

        if ( !existe ) { // pregunto si existen las carpetas y las creo con mkdirkSync
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;

    }

    private obtenerImagenesEnTemp( userId: string ) {

        const pathTemp = path.resolve(  __dirname, "../uploads/", userId, "temp" );

        return fs.readdirSync( pathTemp ) || [];

    }

    private crearCarpetaOrden( ordenId: string ) {

        const pathUser = path.resolve(  __dirname, "../uploads/orden", ordenId ); // __dirname me trae la ruta
        const pathUserTemp = pathUser + "/temp";
        // console.log(pathUser);

        const existe = fs.existsSync( pathUser );

        if ( !existe ) { // pregunto si existen las carpetas y las creo con mkdirkSync
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;

    }

    private obtenerImagenesEnTempOrden( ordenId: string ) {

        const pathTemp = path.resolve(  __dirname, "../uploads/orden", ordenId, "temp" );

        return fs.readdirSync( pathTemp ) || [];

    }

}
