
import express from "express";

export default class Server {

    public app: express.Application;
    public port: any;
    // public port: number = 3000;
    // public ip: '192.168.3.110';

    constructor() {
        this.app = express();
    }
            // Function
    public start( callback: any ) {
         const port = process.env.PORT || 5000;
         this.app.set("port", port); // linea nueva
         this.port = port; // nueva linea
         this.app.listen( this.port, callback );
        // this.app.listen( this.port, callback );
    }

}
