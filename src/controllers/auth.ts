import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from "../services/auth";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import { getRedis, setRedis } from "../services/redisConfig";

dotenv.config();

export const login: RequestHandler = async(req, res) => {
    const loginSchema = z.object({
        password: z.string(),
    })
    const body = loginSchema.safeParse(req.body);
    console.log(body)
    console.log(req.body)
    if(!body.success) return res.json({error: "Dados inválidos"});

    if(!auth.validatePassword(body.data.password)){
        return res.status(403).json({error: "Acesso Negado"});
    }

    const token = JWT.sign(
        {token: auth.createToken()},
        process.env.SECRET_KEY as string,
        {expiresIn: "1d"}
    )

    res.json({
        token
    });
   
}

export const validate: RequestHandler = async(req, res, next) => {
   
    if(!req.headers.authorization){
        return res.status(403).json({error: "Acesso Negado"});
        
    }

    let auth = await validateWithHeader(req.headers.authorization);
    if(auth) return next();

    return res.status(403).json({error: "Acesso Negado"});
   
}  

const validateWithHeader = async(header: string)=>{
    if(!header){
        return false   
    }
    const token = header.split(' ')[1];;

    return await decodedToken(token);
}

const decodedToken = async(token: string) => {
    try{
        const decoded: {token: string, exp: number, iat: number} | any = JWT.verify(
            token, 
            process.env.SECRET_KEY as string
        );
        
        if(!auth.validateToken(decoded.token)){
            return false
        }

        return true
    }catch(err){
        return false
    }
}
