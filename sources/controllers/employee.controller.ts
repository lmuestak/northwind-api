import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import passport from './../configuration/passport.configuration';
import { Employee } from '../models/employee.model';
import { Order } from '../models/order.model';

export class EmployeeController extends BaseController
{

    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.all);
        this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.one);
        this.router.get(`${this.apiBaseUrl}/:id/manager`, passport.authenticate( 'jwt', { session: false }), this.manager);
        this.router.get(`${this.apiBaseUrl}/:id/workers`, passport.authenticate( 'jwt', { session: false }), this.workers);
        this.router.get(`${this.apiBaseUrl}/:id/orders`, passport.authenticate( 'jwt', { session: false }), this.orders);
        this.router.get(`${this.apiBaseUrl}/:id/orders/:oid`, passport.authenticate( 'jwt', { session: false }), this.order_details);
        this.router.get(`${this.apiBaseUrl}/:id/territories`, passport.authenticate( 'jwt', { session: false }), this.territories);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/employee`;
    }

    async all(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const employees = await DataSource.getRepository(Employee).find({});
            if (!employees) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find employees.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', employees, null);
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
                    const employee = await DataSource.getRepository(Employee).findOne( { where: { employeeId: id }});
                    if (!employee) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find employee with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', employee, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `employee id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'employee id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async manager(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const employee = await DataSource.getRepository(Employee).findOne( { where: { employeeId: id }, relations: { reportsTo: true }});
                    if (!employee) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find employee with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', employee.reportsTo, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `employee id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'employee id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async workers(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const employee = await DataSource.getRepository(Employee).findOne( { where: { employeeId: id }, relations: { employees: true }});
                    if (!employee) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find employee with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', employee.employees, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `employee id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'employee id must be entered.' } ]);
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
                    const employee = await DataSource.getRepository(Employee).findOne( { where: { employeeId: id }, relations: { orders: true }});
                    if (!employee) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find employee with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', employee.orders, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `employee id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'employee id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async territories(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const employee = await DataSource.getRepository(Employee).findOne( { where: { employeeId: id }, relations: { territories: true }});
                    if (!employee) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find employee with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', employee.territories, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `employee id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'employee id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async order_details(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            if(request.params.id && request.params.oid)
            {
                const id = Number.parseInt(request.params.id);
                const oid = Number.parseInt(request.params.oid);
                if(id && oid)
                {
                    const order = await DataSource.getRepository(Order).findOne( { where: { orderId: oid }, relations: { orderDetails: true }});
                    if (!order) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find order with the id '${oid}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', order, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `order id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'order id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }
    
}
