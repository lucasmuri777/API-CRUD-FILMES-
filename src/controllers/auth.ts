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
    
    if(!body.success) return res.json({error: "Dados inválidos"});

    if(!auth.validatePassword(body.data.password)){
        return res.status(403).json({error: "Acesso Negado"});
    }

    const token = JWT.sign(
        {token: auth.createToken()},
        process.env.SECRET_KEY as string,
        {expiresIn: "1d"}
    )

    
    await setRedis(`token`, token);

    res.json({
        token
    });
   
}

export const validate: RequestHandler = async(req, res, next) => {
    let hasRedis = await validateWithRedis();
    if(!req.headers.authorization && hasRedis == false){
        return res.status(403).json({error: "Acesso Negado"});
        
    }

    if(req.headers.authorization){
        let auth = await validateWithHeader(req.headers.authorization);
        if(auth) return next();
    }

    if(hasRedis) return next();

    return res.status(403).json({error: "Acesso Negado"});
   
}  

const validateWithRedis = async()=>{
    let hasRedis = await getRedis(`token`);
    if(!hasRedis) return false;

    return await decodedToken(hasRedis);
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
