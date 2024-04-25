import { getRedis, removeRedis, setRedis } from "./redisConfig";
import * as filmes from "../services/filmes";

export const getAll = async() => {
    try{
        return await getRedis(`filmes`);
    }catch(err){
       return false;
    }
}

export const getById = async(id: number) => {
    try{    
        return await getRedis(`filmes:${id}`);
    }catch(err){
        return false;
    }
   
}
type FilmesParams = {
    id: number,
    name: string;
    description?: string;
}	

export const create = async(filme: FilmesParams) => {
    try {
        const result = await AttList();

        if(!result) return false;

        return await setRedis(`filmes:${filme.id}`, JSON.stringify(filme));
    }catch (err) {
        return false;
    }
}

export const remove = async(id: number) => {
    try{
        const result = await AttList();

        if(!result) return false;

        return await removeRedis(`filmes:${id}`);
    }catch(err){
        return false;
    }
}

export const update = async(id: number, filme: FilmesParams) => {
    try{
        const result = await AttList();
        if(!result) return false;
        return await setRedis(`filmes:${id}`, JSON.stringify(filme));
    }catch(err){
        return false;
    }
}


export const AttList = async() => {
    try{
        const result = await filmes.getAll();
        return await setRedis(`filmes`, JSON.stringify(result));
    }catch(err){
        return false;
    }
}