import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import passport from './../configuration/passport.configuration';
import { Product } from '../models/product.model';

export class ProductController extends BaseController
{

    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.all);
        this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.one);
        this.router.get(`${this.apiBaseUrl}/:id/category`, passport.authenticate( 'jwt', { session: false }), this.category);
        this.router.get(`${this.apiBaseUrl}/:id/supplier`, passport.authenticate( 'jwt', { session: false }), this.supplier);
        this.router.get(`${this.apiBaseUrl}/:id/order-details`, passport.authenticate( 'jwt', { session: false }), this.orderDetails);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/product`;
    }

    async all(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const products = await DataSource.getRepository(Product).find({});
            if (!products) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find products.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', products, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const product = await DataSource.getRepository(Product).findOne( { where: { productId: id }});

                    if (!product) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find product with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', product, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `product id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'product id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async category(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const product = await DataSource.getRepository(Product).findOne( { where: { productId: id }, relations: { category: true }});
                    if (!product) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find category for the product with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', product.category, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `product id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'product id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async supplier(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const product = await DataSource.getRepository(Product).findOne( { where: { productId: id }, relations: { supplier: true }});
                    if (!product) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find supplier for the product with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', product.supplier, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `product id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'product id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }
    
    async orderDetails(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const product = await DataSource.getRepository(Product).findOne( { where: { productId: id }, relations: { orderDetails: true }});
                    if (!product) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find the product with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', product.orderDetails, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `product id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'product id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }
}
