import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { BaseController } from '../infrastructure/controller.base';
import { DataSource } from '../infrastructure/sqlite.database';
import { Category } from '../models/category.model';
import passport from './../configuration/passport.configuration';

export class CategoryController extends BaseController
{

    private categoryValidationRules = 
    [
        body('categoryName').notEmpty().withMessage('Category name is required.')
    ];

    public override initialize() 
    {
        this.router.get(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.selectAll);
        this.router.get(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.selectOne);
        this.router.get(`${this.apiBaseUrl}/:id/products`, passport.authenticate( 'jwt', { session: false }), this.selectProductsByCategoryId);
        this.router.post(`${this.apiBaseUrl}/`, passport.authenticate( 'jwt', { session: false }), this.categoryValidationRules, this.insert);
        this.router.put(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.categoryValidationRules, this.update);
        this.router.delete(`${this.apiBaseUrl}/:id`, passport.authenticate( 'jwt', { session: false }), this.delete);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/category`;
    }

    async selectOne(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const category = await DataSource.getRepository(Category).findOne( { where: { categoryId: id }});

                    if (!category) 
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find category with the id '${id}'.` } ]);
                    else
                        return super.jsonResponse(response, 200, true, 'SUCCESS', category, null);
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `category id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'category id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async selectAll(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            const categories = await DataSource.getRepository(Category).find({});
            if (!categories) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find categories.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', categories, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async insert(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {

            const errors = validationResult(request);
            if (!errors.isEmpty()) return response.status(400).json({ success: false, status: 'FAILURE', errors: errors.array() });
    
            const { categoryName, description} = request.body;

            let category: Category | null = new Category();
                category.categoryName = categoryName,
                category.description = description;

            category = await DataSource.manager.save<Category>(category);
            category = await DataSource.getRepository(Category).findOne({ where: { categoryId: category.categoryId }});
            
            if (!category) 
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find category.` } ]);
            else
                return super.jsonResponse(response, 200, true, 'SUCCESS', category, null);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {

            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    let category = await DataSource.getRepository(Category).findOne( { where: { categoryId: id }});
                    if (!category) 
                    {
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find category with the id '${id}'.` } ]);
                    }
                    else
                    {
                        const { categoryName, description} = request.body;
                        if(categoryName && categoryName != category.categoryName)
                            category.categoryName = categoryName;
                        if(description && description != category.description)
                            category.description = description;
                        category = await DataSource.manager.save<Category>(category);
                        return super.jsonResponse(response, 200, true, 'SUCCESS', category, null);
                    }
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'category id must be entered.' } ]);       
            } 
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'category id must be entered.' } ]);
        }
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const category = await DataSource.getRepository(Category).findOne( { where: { categoryId: id }});

                    if (!category) 
                    {
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find category with the id '${id}'.` } ]);
                    }
                    else
                    {
                        await DataSource.manager.delete(Category, category.categoryId);
                        return super.jsonResponse(response, 200, true, 'SUCCESS', category, null);
                    }
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `category id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'category id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async selectProductsByCategoryId(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            if(request.params.id)
            {
                const id = Number.parseInt(request.params.id);
                if(id)
                {
                    const category = await DataSource.getRepository(Category).findOne( { where: { categoryId: id }, relations: { products: true }});

                    if (!category) 
                    {
                        return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `cannot find category with the id '${id}'.` } ]);
                    }
                    else
                    {
                        const products = category.products;
                        return super.jsonResponse(response, 200, true, 'SUCCESS', products, null);
                    }
                }
                return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: `category id '${id}' invalid.` } ]);
            }
            return super.jsonResponse(response, 400, false, 'FAILURE', null, [ { message: 'category id must be entered.' } ]);
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }
    
}
