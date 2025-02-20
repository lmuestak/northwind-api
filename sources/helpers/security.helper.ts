import crypto from 'crypto';
import fs from 'fs';
import jsonwebtoken, { Algorithm, SignOptions } from 'jsonwebtoken';
import path from 'path';
import randtoken from 'rand-token';
import { AppConfig as config } from '../configuration/application.configuration';
import { Employee } from '../models/employee.model';

export class SecurityHelper 
{

    private static securityPath = `${path.join(__dirname, '../configuration')}/security`;
    private static publicRsaKey = `${SecurityHelper.securityPath}/rsa_public.pem`;
    private static privateRsaKey = `${SecurityHelper.securityPath }/rsa_private.pem`;

    public static isPasswordValid(password: string, hash: string, salt: string): boolean 
    {
        const verified = crypto.pbkdf2Sync(password, salt, config.security.iterations, config.security.key_length, config.security.digest).toString('hex');
        return hash === verified;
    }

    public static get PUBLIC_RSA_KEY(): string 
    {
        return fs.readFileSync(SecurityHelper.publicRsaKey,'utf-8');
    }

    public static get PRIVATE_RSA_KEY(): string 
    {
        return fs.readFileSync(SecurityHelper.privateRsaKey, 'utf-8');
    }

    public static get PUBLIC_RSA_KEY_PATH(): string 
    {
        return SecurityHelper.publicRsaKey;
    }

    public static get PRIVATE_RSA_KEY_PATH(): string 
    {
        return SecurityHelper.privateRsaKey;
    }

    public static generatePassword(password: string): any 
    {
        const salt = crypto.randomBytes(32).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, config.security.iterations, config.security.key_length, config.security.digest).toString('hex');
        const result = 
        {
            salt: salt,
            hash: hash,
        };
        return result;
    }

    public static generateRsaKeys(): void 
    {

        if (!fs.existsSync(SecurityHelper.securityPath)) fs.mkdirSync(SecurityHelper.securityPath);

        const keyPair = crypto.generateKeyPairSync('rsa', 
            {
                modulusLength: 4096, // bits - standard for RSA keys
                publicKeyEncoding: 
                {
                    type: 'pkcs1', // 'Public Key Cryptography Standards 1'
                    format: 'pem', // Most common formatting choice
                },
                privateKeyEncoding: 
                {
                    type: 'pkcs1', // 'Public Key Cryptography Standards 1'
                    format: 'pem', // Most common formatting choice
                },
            }
        );

        fs.writeFileSync(SecurityHelper.publicRsaKey,keyPair.publicKey);
        fs.writeFileSync(SecurityHelper.privateRsaKey, keyPair.privateKey);

    }

    public static rsaKeysExists(): boolean 
    {
        return fs.existsSync(SecurityHelper.privateRsaKey) && fs.existsSync(SecurityHelper.publicRsaKey);
    }

    public static async generateJwtToken(employee: Employee): Promise<any> 
    {
        let jwt_refresh_token = employee ? employee.refreshToken : null;
        if (!jwt_refresh_token || jwt_refresh_token.length == 0) 
        {
            console.log(`Employee '${employee.email}' has no refresh token. Tyring to create one...`);
            jwt_refresh_token = randtoken.uid(256);
            employee.refreshToken = jwt_refresh_token;
        }

        const jwtPayload = { sub: employee.employeeId };
        const algorithm: Algorithm = config.jwt.options.algorithm as Algorithm;
        let jwtOptions: SignOptions = 
        {
            expiresIn: Number.parseInt(config.jwt.options.expiresIn!),
            issuer: config.jwt.options.issuer,
            audience: config.jwt.options.audience,
            algorithm: algorithm
        };

        const jwtToken = jsonwebtoken.sign(jwtPayload, SecurityHelper.PRIVATE_RSA_KEY, jwtOptions);
        const jwtResult = 
        {
            jwt_token: jwtToken,
            jwt_refresh_token: jwt_refresh_token,
            exp: (jsonwebtoken.decode(jwtToken) as any).exp
        };
        return jwtResult;
    }
};