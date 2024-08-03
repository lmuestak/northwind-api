import dotenv from 'dotenv';
const dotEnvConfigFilePath = __dirname + `/.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`;
console.log(dotEnvConfigFilePath);
dotenv.config({ path : dotEnvConfigFilePath});

export const AppConfig = 
{
    port: Number.parseInt(process.env.SERVER_PORT ?? '4000'),
    api_version: process.env.API_VERSION,
    api_version_short : process.env.API_VERSION_SHORT,
    database: 
    {
        mode: process.env.DATABASE_MODE,
        file_name: __dirname + process.env.DATABASE_FILE_NAME
    },
    security: 
    {
        iterations: 50000,
        key_length: 128,
        digest: 'sha512'
    },
    jwt: 
    {
        options: 
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
            algorithm: process.env.JWT_ALGORITHM,
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        }
    },
    session: 
    {
        secret: process.env.PASSPORT_SESSION_SECRET
    }
};