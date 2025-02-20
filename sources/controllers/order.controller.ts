import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import { Order } from '../models/order.model';
import passport from './../configuration/passport.configuration';

export class OrderController extends BaseController
{

    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.all);
        this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.one);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/order`;
    }

    async all(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const orders = await DataSource.getRepository(Order).find({});
            if (!orders) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find orders.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', orders, null);
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
                    const product = await DataSource.getRepository(Order).findOne( { where: { orderId: id }, relations: { employee: true, shipVia: true, customer: true, orderDetails: { product: true } }});

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

}
