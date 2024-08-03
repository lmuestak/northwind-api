import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import { Supplier } from '../models/supplier.model';
import passport from './../configuration/passport.configuration';

export class SupplierController extends BaseController
{

    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.all);
        this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.one);
        this.router.get(`${this.apiBaseUrl}/:id/products`, passport.authenticate( 'jwt', { session: false }), this.products);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/supplier`;
    }

    async all(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            const suppliers = await DataSource.getRepository(Supplier).find({});
            if (!suppliers) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find suppliers.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', suppliers, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const supplier = await DataSource.getRepository(Supplier).findOne( { where: { supplierId: id }});

                    if (!supplier) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find supplier with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', supplier, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `supplier id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'supplier id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async products(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const supplier = await DataSource.getRepository(Supplier).findOne( { where: { supplierId: id }, relations: { products: true }});
                    if (!supplier) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find supplier with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', supplier.products, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `supplier id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'supplier id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

}
