import * as http from 'http';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { SecurityHelper } from './helpers/security.helper';
import { DataSource } from 'typeorm';
import { swaggerConfigurationOptions, swaggerSpecification } from './configuration/swagger.configuration';

export class NorthwindApplication
{

    private _port: Number = 4000;
    private _application!: Application;
    private _dataSource!: DataSource;
    private _routes: string[] = [];

    constructor(init: { port: number; data_source: DataSource, express: Application, middlewares: any; controllers: any; })
    {
        this._port = init.port;
        this._application = init.express;
        this._dataSource = init.data_source;
        this.security();
        this.middlewares(init.middlewares);
        this.controllers(init.controllers);
        this.determineRoutes();
    }

    public get port()
    {
        return this._port;
    }

    public get application()
    {
        return this._application;
    }

    public get dataSource()
    {
        return this._dataSource;
    }

    public get routes()
    {
        return this._routes;
    }

    private async database()
    {
        try
        {
            await this.dataSource.initialize();
            console.log('Database successfully initialized.');
            // Activate if employee passwords are not working anymore to reset them
            // const users = await this.dataSource.manager.find(Employee, {});
            // if(users && users.length > 0)
            // {
            //     let hasChanges = false;
            //     users.forEach( (user) => 
            //     {
            //         const password = SecurityHelper.generatePassword('northwind');
            //         user.password = password.hash;
            //         user.passwordSalt = password.salt;
            //          hasChanges = true;
            //     });
            //     if(hasChanges)
            //         await this.dataSource.manager.save(users);
            // }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) 
    {
        middleWares.forEach(middleWare => 
        {
            this._application.use(middleWare)
        });
    }

    private controllers(controllers: { forEach: (arg0: (controller: any) => void) => void; }) 
    {
        controllers.forEach(controller => 
        {
            controller.initialize();
            controller.routes.forEach
            (
                (route: string) => 
                {
                    this._routes.push(route);
                }
            );
            this._application.use('/', controller.router)
        });

        this._application.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification, swaggerConfigurationOptions));
    }

    private security() 
    {
        if (!SecurityHelper.rsaKeysExists()) 
        {
            SecurityHelper.generateRsaKeys();
        }
    }

    private determineRoutes(): void
    {
        this._application._router.stack.forEach((r: any) =>
        {
            if (r.route && r.route.path) 
            {
                if(r.route.methods.get)
                    this._routes.push(`GET     ${r.route.path}`);
                if(r.route.methods.post)
                    this._routes.push(`POST    ${r.route.path}`);
                if(r.route.methods.put)
                    this._routes.push(`PUT     ${r.route.path}`);
                if(r.route.methods.patch)
                    this._routes.push(`PATCH   ${r.route.path}`);
                if(r.route.methods.delete)
                    this._routes.push(`DELETE  ${r.route.path}`);
                if(r.route.methods.head)
                    this._routes.push(`HEAD    ${r.route.path}`);
                if(r.route.methods.options)
                    this._routes.push(`OPTIONS ${r.route.path}`);
            }
        });
        this._routes;
    }

    public async run()
    {

        this.database();
        console.log('Running the application...');

        http.createServer(this._application).listen(this._port, () => 
            {
                console.log(`Northwind RESTfull API is running on port: ${this._port}`);
                console.log(this.routes);
            }
        );
    }

}