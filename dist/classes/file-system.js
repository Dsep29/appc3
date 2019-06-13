"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// prop. node
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    generarNombreUnico(nombreOriginal) {
        // 6.copy.jpg obtener la extension
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default(); // id unico para los archivos
        return `${idUnico}.${extension}`; // retornamos el nuevo id
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId); // __dirname me trae la ruta
        const pathUserTemp = pathUser + '/temp';
        // console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) { // pregunto si existen las carpetas y las creo con mkdirkSync
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagenesDeTempHaciaPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`); //cambiar de temp a uploads
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(userId, img) {
        // Path POSTs
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        // Si la imagen existe
        const existe = fs_1.default.existsSync(pathFoto); // pregunto si la ruta existe
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg'); //error de imagen
        }
        return pathFoto; // construccion de la foto
    }
    crearCarpetaOrden(ordenId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/orden', ordenId); // __dirname me trae la ruta
        const pathUserTemp = pathUser + '/temp';
        // console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) { // pregunto si existen las carpetas y las creo con mkdirkSync
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagenesDeTempHaciaOrden(ordenId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/orden', ordenId, 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads/orden', ordenId, 'orden');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTempOrden(ordenId);
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`); //cambiar de temp a uploads
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTempOrden(ordenId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/orden', ordenId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrlOrden(userId, img) {
        // Path POSTs
        const pathFoto = path_1.default.resolve(__dirname, '../uploads/orden', userId, 'posts', img);
        // Si la imagen existe
        const existe = fs_1.default.existsSync(pathFoto); // pregunto si la ruta existe
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg'); //error de imagen
        }
        return pathFoto; // construccion de la foto
    }
    guardarImagenTemporalOrden(file, ordenId) {
        return new Promise((resolve, reject) => {
            // Crear carpetas
            const path = this.crearCarpetaOrden(ordenId);
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = FileSystem;
