"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    // public port: number = 3000;
    // public ip: '192.168.3.110';
    constructor() {
        this.app = express_1.default();
    }
    // Function
    start(callback) {
        // var port = process.env.PORT || 8080; // linea nueva
        var port = process.env.PORT;
        this.app.set('port', port); // linea nueva
        this.port = port; // nueva linea
        this.app.listen(this.port, callback);
        // this.app.listen( this.port, callback );
    }
}
exports.default = Server;
