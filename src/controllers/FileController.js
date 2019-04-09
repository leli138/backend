const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
    async store(req, res){
        //Buscar a box via ID
        const box = await Box.findById(req.params.id);

        const file = await File.create({ 
            title: req.file.originalname,
            path: req.file.key
         });
        
        box.files.push(file);

        await box.save();

        //Pega todos os usuários conectados naquela box com aquele id
        req.io.sockets.in(box._id).emit('file',file);

        //Criar um arquivo    
        return res.json(file);
    }
}

//Usamos o new e não o return, para acessar os metodos da classe
module.exports = new FileController();