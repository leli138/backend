const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


//Variável que guarda todas as informações da aplicação
const app = express();
app.use(cors()); //Todo mundo pode acessar

const server = require('http').Server(app);
const io = require('socket.io')(server);

//Quando receber conexao via websocket, da um join na sala box, conecta o usuario em uma sala unica
io.on('connection', socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    });
});

app.use((req,res,next)=>{
    req.io = io; //Toda rota que vier apartir de app.use vai ter acesso a io dentro do req
    return next; //Processa esse código e passa para as rotas terminar de processar.
});

mongoose.connect('mongodb+srv://weslen:short649@cluster0-umrad.mongodb.net/omnistack?retryWrites=true', {
useNewUrlParser: true

});

//Cadastrar um módulo dentro do express
app.use(express.json());



//Permite que envie arquivos nas requisições
app.use(express.urlencoded({ extended: true }));

//Toda vez que o usuário entrar na rota files ele busca o arquivo fisico
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

//Importa o arquivos routes.js
app.use(require('./routes'));

//Rodar o servidor em um a porta
server.listen(process.env.PORT || 3333);
