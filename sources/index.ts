import express, { Router } from 'express';
import cors from 'cors';
import session from 'express-session';
import { NorthwindApplication } from "./application";
import { CorsOptions } from './configuration/cors.configuration';
import { AppConfig } from "./configuration/application.configuration";
import passport from './configuration/passport.configuration';
import { AuthenticationController } from './controllers/authentication.controller';
import { DataSource } from './infrastructure/sqlite.database';
import { CategoryController } from './controllers/category.controller';



const port = AppConfig.port;

const middlewares = 
[
    cors(CorsOptions),
    express.json({ limit: '10mb' }),
    express.urlencoded({ extended: true }),
    passport.initialize(),
    // session({ secret: AppConfig.session.secret, resave: false, saveUninitialized: false, cookie: { secure: true } }),
    // passport.session()
];

const controllers = 
[
    new AuthenticationController(),
    new CategoryController()
];

const app = new NorthwindApplication({port: port, data_source: DataSource,  express: express(), middlewares: middlewares, controllers: controllers});

(async() => 
    {
        try 
        {
            await app.run();
        }
        catch(err)
        {
            console.log(err);
        }
    }
)();
