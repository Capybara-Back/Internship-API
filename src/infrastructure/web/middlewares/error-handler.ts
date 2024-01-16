import { Request, Response, NextFunction } from 'express';
import { FailResponse } from '../../../common/contracts';

export default function errorHandler(
    err: any,
    __: Request,
    res: Response,
    _: NextFunction
): void {
    res.status(err.code || 500);
    res.send(
        FailResponse.create({
            msg: err.msg || err.message || 'No message was given',
            reason: err.reason || err.stack || 'Something went wrong',
            validationErrors: err.validationErrors
        })
    );
}
