import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../infrastructure/controller.base';
import { SecurityHelper } from '../helpers/security.helper';
import { Employee } from '../models/employee.model';
import { body, validationResult } from 'express-validator';
import { DataSource } from '../infrastructure/sqlite.database';

export class AuthenticationController extends BaseController
{

    private loginValidationRules = 
    [
        body('email').notEmpty().withMessage('Email required.').isEmail().withMessage('Email must be valid.'),
        body('password').notEmpty().withMessage('Password required.'),
    ];

    public override initialize() 
    {
        this.router.post(`${this.apiBaseUrl}/login`, this.loginValidationRules, this.login);
        this.router.post(`${this.apiBaseUrl}/refresh`, this.refresh);
    }

    public override get apiBaseUrl () : string
    {
        return `${super.apiBaseUrl}/auth`;
    }

    async login(request: Request, response: Response, next: NextFunction) 
    {
        try 
        {
            const errors = validationResult(request);
            if (!errors.isEmpty()) return super.jsonResponse(response, 400, false, 'Login data incomplete.', null, errors.array());

            const { email, password }: any = request.body;
            let employee = await DataSource.getRepository(Employee).createQueryBuilder('employee').select().addSelect("employee.password").addSelect("employee.passwordSalt").addSelect("employee.refreshToken").where({ email: email }).getOne();
            if (!employee) return super.jsonResponse(response, 400, false, `Cannot find employee with the email '${email}'.`);

            const valid = SecurityHelper.isPasswordValid(password, employee.password || '', employee.passwordSalt || '' );
            if (valid) 
            {
                const status = employee.status;
                switch (status) 
                {
                    case 'not_confirmed':
                        return super.jsonResponse(response, 400, false, 'Email is not confirmed.');
                    case 'not_active':
                        return super.jsonResponse(response, 400, false, 'Employee not active.');
                    case 'active':
                        const jwtTokenObject = (await SecurityHelper.generateJwtToken(employee)) as any;
                        await DataSource.manager.update<Employee>(Employee, employee.employeeId, { refreshToken: jwtTokenObject.jwt_refresh_token });
                        const result = { jwt_token: jwtTokenObject.jwt_token, jwt_refresh_token: jwtTokenObject.jwt_refresh_token };
                        return super.jsonResponse(response, 200, true, 'Login successfully.', result);
                    default:
                        return super.jsonResponse(response, 400, false, 'Employee status is invalid.');
                }
            }
            else 
            {
                super.jsonResponse(response, 400, false, 'Password is incorrect.');
            }
        } 
        catch (error: any) 
        {
            return super.jsonResponse(response, 400, false, error.message);
        }
    }

    async refresh(request: Request, response: Response, next: any) 
    {
        const { refreshToken } = request.body;
        if (!refreshToken) return super.jsonResponse(response, 400, false, 'Failure', null, [{ field: 'refreshToken', constraint: 'required', message: 'Refreshtoken cannot be empty or null' }]);
        try 
        {
            let employee = await DataSource.getRepository(Employee).createQueryBuilder('employee').select().addSelect("employee.password").addSelect("employee.passwordSalt").addSelect("employee.refreshToken").where({ refreshToken: refreshToken }).getOne();
            if (!employee) return super.jsonResponse(response, 400, false, 'Failure', null, [{ field: 'refreshToken', constraint: 'required', message: 'Employee not found.' }]);
            const status = employee.status;
            switch (status) 
            {
                case 'not_confirmed':
                    return super.jsonResponse(response, 400, false, 'Email is not confirmed.');
                case 'not_active':
                    return super.jsonResponse(response, 400, false, 'Employee not active.');
                case 'active':
                    const jwtTokenObject = (await SecurityHelper.generateJwtToken(employee)) as any;
                    await DataSource.manager.update<Employee>(Employee, employee.employeeId, { refreshToken: jwtTokenObject.jwt_refresh_token });
                    const result = { jwt_token: jwtTokenObject.jwt_token, jwt_refresh_token: jwtTokenObject.jwt_refresh_token };
                    return super.jsonResponse(response, 200, true, 'Login successfully.', result);
                default:
                    return super.jsonResponse(response, 400, false, 'Employee status is invalid.');
            }
        } 
        catch (error: any) 
        {
            next(error);
        }
    }
}
