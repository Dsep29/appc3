
import express from 'express';


export default class Server {

    public app : express.Application;
    public port: any;
    // public port: number = 3000;
    // public ip: '192.168.3.110';

    constructor() {
        this.app = express();
    }
            // Function
    start( callback:any ) {
         // var port = process.env.PORT || 8080; // linea nueva
         var port = process.env.PORT;
         this.app.set('port', port); // linea nueva
         this.port = port; // nueva linea
         this.app.listen( this.port, callback );
        // this.app.listen( this.port, callback );
    }

}