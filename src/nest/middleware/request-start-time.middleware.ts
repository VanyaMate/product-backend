import { NextFunction, Request, Response } from 'express';
import { REQUEST_START_TIME } from '@/nest/interceptors/consts';


export const requestStartTimeMiddleware = function (req: Request, res: Response, next: NextFunction) {
    req[REQUEST_START_TIME] = Date.now();
    next();
};