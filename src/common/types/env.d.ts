declare namespace NodeJS {
    interface ProcessEnv {
        NodeEnv: string
        MONGO_HOST:string
        MONGO_PORT:number
        MONGO_DATABSE:webidemy_db
        MONGO_USERNAME:string
        MONGO_PASSWORD:string
        JWT_SECRET_KEY: string;
        APP_PORT:number
        APP_TYPE:string
        APP_HOST:AString
        ACCESS_TOKEN_SECRET_KEY: string;
        REFRESH_TOKEN_SECRET_KEY: string;
    }
}