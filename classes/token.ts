import jwt from "jsonwebtoken";

export default class Token {

    public static getJwtToken( payload: any ): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });

    }

    public static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( userToken, this.seed, ( err, decoded ) => {

                if ( err ) {
                    reject();
                } else {
                    resolve( decoded );
                }

            });

        });

    }

    private static seed: string = "este-es-el-seed-de-mi-app-secreto";
    private static caducidad: string = "30d";

// tslint:disable-next-line: no-empty
    constructor() { }

}
