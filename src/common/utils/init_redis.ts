import { createClient } from 'redis';

const redisClient=createClient();
redisClient.connect();
redisClient.on('connect',()=>console.log('Connect to redis'))
redisClient.on('error',(err)=>console.log('RedisError :',err.message));
redisClient.on('ready',(err)=>console.log('Connected redis and ready to use!'));
redisClient.on('end',(err)=>console.log('disConnected from connect!'));

export default redisClient;