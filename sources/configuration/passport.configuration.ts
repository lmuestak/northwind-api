import passport from 'passport';
import { Algorithm } from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { AppConfig as config } from '../configuration/application.configuration';
import { SecurityHelper } from '../helpers/security.helper';
import { DataSource } from '../infrastructure/sqlite.database';
import { Employee } from '../models/employee.model';

const jwtOptions: StrategyOptions = 
{
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SecurityHelper.PUBLIC_RSA_KEY,
    issuer: config.jwt.options.issuer,
    audience: config.jwt.options.audience,
    algorithms: [config.jwt.options.algorithm as Algorithm]
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: any, done: any) => 
{
    const employee = await DataSource.getRepository(Employee).findOne({ where : { employeeId: payload.sub }}); 
    if (employee) return done(null, employee);
    return done(null, false);
});

passport.use(jwtStrategy);

export default passport;