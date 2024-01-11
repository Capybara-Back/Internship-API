import express, { Express } from 'express';
import RouterHandler from './routers/router.abstract';
import { AppDataSource } from '../database/orm/typeorm/typeorm';

export default class ExpressApp {
    private _app: Express;
    private _routerHandler: RouterHandler;
    private _appInitialized: boolean = false;

    public constructor(routerHandler: RouterHandler) {
        this._app = express();
        this._routerHandler = routerHandler;
    }

    public build(): Express {
        this.initApp();
        return this._app;
    }

    private initApp(): void {
        if (this._appInitialized === false) {
            this.setAppRouter();

            console.log(process.env);

            AppDataSource.initialize().then(() => {
                this._appInitialized = true;
            });
        }
    }

    private setAppRouter(): void {
        this._app.use('', this._routerHandler.getRouter());
    }
}
