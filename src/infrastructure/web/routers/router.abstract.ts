import { Router, Request, Response, NextFunction } from 'express';
import Deliverer from '../delivery/interfaces/deliverer.abstract';

interface DelivererConstructable {
    new (req: Request, res: Response, next: NextFunction): Deliverer;
}

export default abstract class RouterHandler {
    protected _router: Router;

    public constructor() {
        this._router = Router();
    }

    public getRouter(): Router {
        return this._router;
    }

    protected handleRequest(Deliverer: DelivererConstructable) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const deliverer = new Deliverer(req, res, next);
            await deliverer.respond();
        };
    }
}
