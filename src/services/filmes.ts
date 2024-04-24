import { Op } from "sequelize";
import { Filmes } from "../model/Filmes";

export const getAll = async() => {
    try{
        return await Filmes.findAll();
    }catch(err){
       return false;
    }
}

export const getById = async(id: number) => {
    try {
        return await Filmes.findByPk(id);
    } catch (err) {
        return false; 
    }
}

type FilmesParams = {
    name: string;
    description?: string;
}	

export const create = async(filters: FilmesParams) => {
    try {
        return await Filmes.create(filters);
    } catch (err) {
        return false;
    }
}


export const update = async(id: number, filters: FilmesParams) => {
    try {
        return await Filmes.update(filters, {
            where: {
                id
            }
        });;
    }catch(err){
        return false;
    }
}

export const remove = async(id: number) => {
    try {
        return await Filmes.destroy({
            where: {
                id
            }
        });
    }catch(err){

    }
}
