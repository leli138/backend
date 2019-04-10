//Representa uma pasta da aplicação
const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    path:{ //Nome do arquivo fisico armazenado na minha apllicação
        type:String,
        required: true     
    },

}, {
    timestamps: true,
    //Quando o file foi um objeto ou um json converte para virtual e retorna a url
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

//Criar um campo virtual
File.virtual('url').get(function(){
    const url = process.env.URL || 'http://localhost:3333';
    //Coloca o texto de dentro em URL
    return  `${url}/files/${encodeURIComponent(this.path)}`; 
});


module.exports = mongoose.model("File", File);
