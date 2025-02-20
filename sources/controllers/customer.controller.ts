import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import { Customer } from '../models/customer.model';
import passport from './../configuration/passport.configuration';

export class CustomerController extends BaseController
{
    
    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.all);
        this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.one);
        this.router.get(`${this.apiBaseUrl}/:id/orders`, passport.authenticate( 'jwt', { session: false }), this.orders);
        // this.router.post(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.categoryValidationRules, this.insert);
        // this.router.put(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.categoryValidationRules, this.update);
        // this.router.delete(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.delete);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/customer`;
    }

    async one(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = request.params.id.toUpperCase();
                if(id)
                {
                    const customer = await DataSource.getRepository(Customer).findOne( { where: { customerId: id }});

                    if (!customer) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find customer with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', customer, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `customer id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'customer id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async all(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const customers = await DataSource.getRepository(Customer).find({});
            if (!customers) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find customers.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', customers, null);
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
                const id = request.params.id.toUpperCase();
                if(id)
                {
                    const customer = await DataSource.getRepository(Customer).findOne( { where: { customerId: id }, relations: { orders: { orderDetails: true } } });

                    if (!customer) 
                    {
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find customer with the id '${id}'.` } ]);
                    }
                    else
                    {
                        const orders = customer.orders;
                        return super.jsonResponse(response, 200, true, 'SUCCESS', orders, null);
                    }
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `customer id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'customer id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }
    
}
