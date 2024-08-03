import { AppConfig as config } from '../configuration/application.configuration';

export const SwaggerOptions = 
{
    swagger: '2.0.0',
    info: 
    {
        version: '1.0.0',
        title: 'Northwind RESTfull API',
        description: 'Northwind database RESTfull API',
        license: 
        {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    host: `http://127.0.0.1:${config.port}/api/v1`,
    basePath: '/',
    schemas: 
    [
        'http'
    ],
    consumes: 
    [
        'application/json'
    ],
    produces: 
    [
        'application/json'
    ]
};