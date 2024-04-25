import Redis from 'ioredis';
import {promisify} from 'util';
import dotenv from 'dotenv';

dotenv.config();
const password = process.env.REDIS_PASSWORD
const redisClient = new Redis(process.env.REDIS_URL as string,{
    password,
});

function getRedis(value: string){
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
}

function setRedis(key: string, value: string){
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);
}

function removeRedis(key: string){
    const syncRedisDel: any = promisify(redisClient.del).bind(redisClient);
    return syncRedisDel(key);
}

export { redisClient, getRedis, setRedis, removeRedis };