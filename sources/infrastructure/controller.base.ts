import { Response, Router } from "express";
import { AppConfig } from "../configuration/application.configuration";

export interface IBaseController 
{
    get apiBaseUrl(): string;
    get router(): Router;
    get routes(): string[] | null;
    initialize(): void;
    jsonResponse(response: Response, httpStatusCode: number, success: boolean, message: string, data: any, errors: any): void;
}

export abstract class BaseController implements IBaseController
{
    
    protected _router: Router = Router();
    protected _apiBaseUrl: string = `/api/${AppConfig.api_version_short}`;

    get apiBaseUrl (): string
    {
        return this._apiBaseUrl;
    }

    get router (): Router
    {
        return this._router;
    }

    jsonResponse ( response: Response, httpStatusCode: number, success: boolean, message: string, data: any = null, errors: any = null)
    {
        let result: any = {};
        result.success = success;
        result.message = message;
        if(data)
            result.data = data;
        if(errors)
            result.errors = errors;
        return response.status(httpStatusCode).json
        (
            result
        );
    }

    initialize (): void
    {
        throw new Error( "Method not implemented." );
    }

    get routes (): string[]
    {
        let routeList: string[] = [];
        this.router.stack.forEach((r: any) => 
            {
                if (r.route && r.route.path) 
                {
                    if(r.route.methods.get)
                        routeList.push(`GET     ${r.route.path}`);
                    if(r.route.methods.post)
                        routeList.push(`POST    ${r.route.path}`);
                    if(r.route.methods.put)
                        routeList.push(`PUT     ${r.route.path}`);
                    if(r.route.methods.patch)
                        routeList.push(`PATCH   ${r.route.path}`);
                    if(r.route.methods.delete)
                        routeList.push(`DELETE  ${r.route.path}`);
                    if(r.route.methods.head)
                        routeList.push(`HEAD    ${r.route.path}`);
                    if(r.route.methods.options)
                        routeList.push(`OPTIONS ${r.route.path}`);
                }
            }
        );
        return routeList;
    }

}