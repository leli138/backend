//Representa uma pasta da aplicação
const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },

    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }] //Armazena os ID dos files
}, {
    timestamps: true
});

module.exports = mongoose.model("Box", Box);
