//importando dependencias
import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import adminRoutes from './routes/admin';

//configurando dotenv para poder pegar variaveis de ambiente
dotenv.config()

//configurando servidor
const server = express();

//Liberando o cors publico do server/api
server.use(cors());

//Liberando o servidor para pegar arquivos publicos
server.use(express.static(path.join(__dirname, 'public')));

//Liberando o servidor para pegar dados via POST
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//server.use('/api', api);
server.use('/admin', adminRoutes);
//Quando rota nao for achada
server.use((req: Request, res: Response)=>{
    res.status(404).json({message: 'Rota nao encontrada'});
})

server.listen(process.env.PORT)