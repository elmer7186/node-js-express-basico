import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const isValidHostname = (req: Request, res: Response, next: NextFunction) => {
    const validHost = ['127.0.0.1', 'localhost'];
    if (validHost.includes(req.hostname)) {
        next();
    } else {
        res.status(403).send({ status: 'ACCESS_DENIED' });
    }
};

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { token } = req.headers;
        if (token) {
            const data: any = jwt.verify(token as string, process.env.JWT_SECRET!);
            req.sessionData = { userId: data.userId, role: data.role };
            next();
        } else {
            throw {
                code: 403,
                status: 'ACCESS_DENIED',
                message: 'Missing header token'
            };
        }
    } catch (error) {
        res
            .status(error.code || 500)
            .send({ status: 'ERROR', message: error.message });
    }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.sessionData;
        if (role !== 'admin') {
            throw {
                code: 403,
                status: 'ACCESS_DENIED',
                message: 'invalid role'
            }
        }
        next();
    } catch (error) {
        res
            .status(error.code || 500)
            .send({ status: error.status || 'ERROR', message: error.message });
    }
}

export {
    isValidHostname,
    isAuth,
    isAdmin
};