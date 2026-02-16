import {NextFunction, Request, Response} from 'express';
import {HttpStatus} from '../../core/types/httpStatutes';
import dotenv from 'dotenv'
dotenv.config()

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const superAdminGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const auth = req.headers['authorization'] as string; // 'Basic xxxx'

    if (!auth) {
        res.sendStatus(HttpStatus.Unauthorized_401)
        return;
    }

    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic') {
        res.sendStatus(HttpStatus.Unauthorized_401)
        return;
    }

    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [userName, userPassword] = credentials.split(':'); //admin:qwerty

    if (userName !== ADMIN_USERNAME || userPassword !== ADMIN_PASSWORD) {
        res.sendStatus(HttpStatus.Unauthorized_401)
        return;
    }
    next();
}