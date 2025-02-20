import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import { Shipper } from '../models/shipper.model';
import passport from './../configuration/passport.configuration';

export class ShipperController extends BaseController
{

    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.all);
        this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.one);
        this.router.get(`${this.apiBaseUrl}/:id/orders`, passport.authenticate( 'jwt', { session: false }), this.orders);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/shipper`;
    }

    async all(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const shippers = await DataSource.getRepository(Shipper).find({});
            if (!shippers) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find shippers.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', shippers, null);
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
                    const shipper = await DataSource.getRepository(Shipper).findOne( { where: { shipperId: id }});
                    if (!shipper) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find shipper with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', shipper, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `shipper id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'shipper id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async orders(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const shipper = await DataSource.getRepository(Shipper).findOne( { where: { shipperId: id }, relations: { orders: true }});
                    if (!shipper) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find shipper with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', shipper.orders, null);
                }
                return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: `shipper id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, `FAILURE`, null, [ { message: 'shipper id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

}
