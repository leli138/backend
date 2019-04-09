const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); //Gera um hash de caracteres unicos
module.exports = {
    dest: path.resolve(__dirname,'..','..','temp'), //padroniza a escrita dos caminhos, os uploads irão para a pasta tempo
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname,'..','..','temp'))
        }, 
        filename: (req, file, cb) => { //Nome unica apara cada arquivo
            crypto.randomBytes(16, (err, hash)=>{
                if (err) cb(err); //Se deu erro envia para o callback

                //senão deu erro
                file.key = `${hash.toString("hex")}-${file.originalname}`;

                //Se deu tudo certo, passou null para o erro

                cb(null, file.key);


            })
        }
    })                                                 
};