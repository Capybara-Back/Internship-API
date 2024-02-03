import IHttpRequestModel from '@adapters/controllers/interfaces/i-http-request.model';
import { Request, Response, NextFunction } from 'express';

export default abstract class Deliverer {
    protected req: Request;
    protected res: Response;
    protected next: NextFunction;

    public constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    public abstract respond(): Promise<void>;

    protected handleError(err: any): void {
        this.next(err);
    }

    protected mapHttpRequest(req: Request): IHttpRequestModel {
        return {
            query: req.query,
            params: req.params,
            body: req.body,
            headers: req.headers,
            files: (req.files as Express.Multer.File[]) || undefined
        };
    }
}
