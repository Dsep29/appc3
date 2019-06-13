
import express from 'express';


export default class Server {

    public app : express.Application;
    // public port: number = 3000;
    // public ip: '192.168.3.110';

    constructor() {
        this.app = express();
    }

    start( callback: Function ) {
         var port = process.env.PORT || 8080; // linea nueva
         this.app.set('port', port); // linea nueva
         this.app.listen( port, callback );
        // this.app.listen( this.port, callback );
    }

}