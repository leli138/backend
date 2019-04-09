const Box = require('../models/Box');

class BoxController {
    async store(req, res){
        

        const box = await Box.create(req.body);
        return res.json(box);
    }

    //Retorna a box e todos os arquivos dentro da box
    async show (req, res){
        const box = await Box.findById(req.params.id).populate({ 
            path: 'files',
            options: {sort : { createdAt:  -1 } } //Ordenar em ordem decrescente
         });
        return res.json(box);
    }
}

//Usamos o new e não o return, para acessar os metodos da classe
module.exports = new BoxController();