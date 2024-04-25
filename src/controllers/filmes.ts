import { RequestHandler } from "express";
import { z } from "zod";
import * as filmes from "../services/filmes";
import { FilmesInstance } from "../model/Filmes";
import { setRedis } from "../services/redisConfig";
import * as filmesRedis from "../services/redisFilmes";
//Pega Todos
export const getAll: RequestHandler = async (req, res) => {
    let hasRedis = await filmesRedis.getAll();
    const result = await filmes.getAll();

    if(result && !hasRedis) {
        await setRedis(`filmes`, JSON.stringify(result));
        return res.json(result)
    }else if(hasRedis){
        return res.json(JSON.parse(hasRedis));
    };
    
    return res.json({error: "Ocorreu um erro!"})
}
//Pega um pelo ID
export const getOne: RequestHandler = async (req, res) => {
    const hasRedis = await filmesRedis.getById(parseInt(req.params.id));
    if(hasRedis) return res.json(JSON.parse(hasRedis));

    const result = await filmes.getById(parseInt(req.params.id));
    if (result) return res.json(result);
     
    return res.status(404).json({ error: 'Filme não encontrado' });
       
};

export const create: RequestHandler = async (req, res) => {
    const createSchema = z.object({
        name: z.string().min(5).max(60),
        description: z.string().max(255)
    });
    const body = createSchema.safeParse(req.body);
    if(!body.success) return res.status(400).json({error: 'Dados invalidos!'});
    
    const result = await filmes.create(body.data);
    if(result) {
        await filmesRedis.create(result);
        return res.json(result).status(201);
    }

    return res.json({error: "Ocorreu um erro!"})
}

export const update: RequestHandler = async (req, res) => {
    const updateSchema = z.object({
        name: z.string().min(5).max(60),
        description: z.string().max(255)
    });
    const body = updateSchema.safeParse(req.body);
    if(!body.success) return res.status(400).json({error: 'Dados invalidos!'});

    const result = await filmes.update(parseInt(req.params.id), body.data);
    if(result) {
        await filmesRedis.update(parseInt(req.params.id),  {
            id: parseInt(req.params.id),
            name: body.data.name,
            description: body.data.description
        });
        return res.json(result);
    }

    return res.json({error: "Ocorreu um erro!"})
}

export const remove: RequestHandler = async (req, res) => {
    const result = await filmes.remove(parseInt(req.params.id));
    if(result) {
        await filmesRedis.remove(parseInt(req.params.id));
        return res.json({message: "Filme removido com sucesso!"}).status(200);
    }
    
    return res.json({error: "Ocorreu um erro!"})
}