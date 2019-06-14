const jwt = require('jsonwebtoken');


// export default class Token {
    module.exports =  function(Token) {

    private seed = 'este-es-el-seed-de-mi-app-secreto';
    private caducidad = '30d';

    getJwtToken( payload: any ): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });

    }

    comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( userToken, this.seed, ( err, decoded ) => {
    
                if ( err ) {
                    reject();
                } else {
                    resolve( decoded );
                }
    
    
            })

        });


    }


}


