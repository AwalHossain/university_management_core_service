import { createClient } from 'redis';
import config from '../config';


const redisClient = createClient({
    url: config.redis.redis_url,
})

const redisPubClient = createClient({
    url: config.redis.redis_url,
})

const redisSubClient = createClient({
    url: config.redis.redis_url,
})

redisClient.on('error', (err) => {
    console.log('Redis error', err);
})


redisClient.on('connect', () => {
    console.log('Redis connected');
})


const connect = async () => {
    await redisClient.connect();
    await redisPubClient.connect();
    await redisSubClient.connect();
}


const set = async (key: string, value: string): Promise<void> => {
    await redisClient.set(key, value);
}

const get = async (key: string): Promise<string | null> => {
    return await redisClient.get(key);
}

const del = async (key: string): Promise<void> => {
    await redisClient.del(key);
}


const disconnect = async () => {
    await redisClient.quit();
    await redisPubClient.quit();
    await redisSubClient.quit();
}



const setAccessToken = async (userId: string, token: string) => {
    const key = `set-access: ${userId}`;
    await redisClient.set(key, token, { EX: Number(config.redis.expires_in) })
}

const getAccessToken = async (userId: string) => {
    const key = `set-access: ${userId}`;
    return redisClient.get(key);
}
const delAccessToken = async (userId: string) => {
    const key = `set-access: ${userId}`;
    return redisClient.del(key);
}


export const RedisClient = {
    connect,
    disconnect,
    set,
    get,
    del,
    setAccessToken,
    getAccessToken,
    delAccessToken,
    publish: redisPubClient.publish.bind(redisPubClient),
    subscribe: redisSubClient.subscribe.bind(redisSubClient)
}
