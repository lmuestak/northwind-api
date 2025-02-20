import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import passport from '../configuration/passport.configuration';
import { OrderDetail } from '../models/order-detail.model';

export class StatisticsController extends BaseController
{
    
    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/sales_by_category`, passport.authenticate( 'jwt', { session: false }), this.salesByCategory);
        this.router.get(`${this.apiBaseUrl}/sales_by_category_and_product`, passport.authenticate( 'jwt', { session: false }), this.salesByCategoryAndProduct);
        this.router.get(`${this.apiBaseUrl}/top_five_customer`, passport.authenticate( 'jwt', { session: false }), this.topFiveCustomers);
        this.router.get(`${this.apiBaseUrl}/top_five_product`, passport.authenticate( 'jwt', { session: false }), this.topFiveProducts);
        // this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.one);
        // this.router.get(`${this.apiBaseUrl}/:id/orders`, passport.authenticate( 'jwt', { session: false }), this.orders);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/statistics`;
    }

    async salesByCategory(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const queryRunner = await DataSource.createQueryRunner();
            var result = await queryRunner.manager.query(`SELECT 
                c.CategoryName AS categoryName,
                SUM(od.UnitPrice * od.Quantity) AS salesPrice,
                ((SUM(od.UnitPrice * od.Quantity))/100) * od.Discount AS discountPrice
            FROM 
                "ORDER DETAILS" od
            LEFT JOIN Products p
            ON
                od.ProductID = p.ProductID
            LEFT JOIN Categories c
            ON
                p.CategoryID = c.CategoryID
            GROUP BY c.CategoryName
            ORDER BY c.CategoryName`);
            return super.jsonResponse(response, 200, true, 'SUCCESS', result, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async salesByCategoryAndProduct(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const queryRunner = await DataSource.createQueryRunner();
            var result = await queryRunner.manager.query(`SELECT 
                c.CategoryName AS CategoryName,
                p.ProductName as ProductName,
                SUM(od.UnitPrice * od.Quantity) AS Price,
                ((SUM(od.UnitPrice * od.Quantity))/100) * od.Discount AS Discount
            FROM 
                "ORDER DETAILS" od
            LEFT JOIN Products p
            ON
                od.ProductID = p.ProductID
            LEFT JOIN Categories c
            ON
                p.CategoryID = c.CategoryID
            GROUP BY c.CategoryName, p.ProductName
            ORDER BY c.CategoryName, p.ProductName`);
            return super.jsonResponse(response, 200, true, 'SUCCESS', result, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async topFiveCustomers(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const queryRunner = await DataSource.createQueryRunner();
            var result = await queryRunner.manager.query(`SELECT 
	c.CompanyName AS CompanyName,
	SUM(od.UnitPrice * od.Quantity) AS salesPrice,
	((SUM(od.UnitPrice * od.Quantity))/100) * od.Discount AS discountPrice
FROM 
	"ORDER DETAILS" od
LEFT JOIN Orders o
ON
	od.OrderID = o.OrderID
LEFT JOIN Customers c
ON
	o.CustomerId = c.CustomerID
GROUP BY c.CompanyName
ORDER BY salesPrice DESC
LIMIT 5`);
            return super.jsonResponse(response, 200, true, 'SUCCESS', result, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }
    
    async topFiveProducts(request: Request, response: Response, next: NextFunction) : Promise<any>
    {
        try 
        {
            const queryRunner = await DataSource.createQueryRunner();
            var result = await queryRunner.manager.query(`SELECT 
	p.ProductName AS ProductName,
	SUM(od.UnitPrice * od.Quantity) AS salesPrice,
	((SUM(od.UnitPrice * od.Quantity))/100) * od.Discount AS discountPrice
FROM 
	"ORDER DETAILS" od
LEFT JOIN Products p
ON
	od.ProductID = p.ProductID

GROUP BY p.ProductName
ORDER BY salesPrice DESC
LIMIT 5`);
            return super.jsonResponse(response, 200, true, 'SUCCESS', result, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }
}
