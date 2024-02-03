import express, { Express } from 'express';
import cors from 'cors';
import RouterHandler from './routers/router.abstract';
import errorHandler from './middlewares/error-handler';
import { DatabaseClient } from '../database/orm';

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
            this.setAppSettings();
            this.setAppRouter();
            this.setErrorHandlers();

            const databaseClient = DatabaseClient.getInstance();

            databaseClient.connect().then(() => {
                this._appInitialized = true;
            });
        }
    }

    private setAppRouter(): void {
        this._app.use('', this._routerHandler.getRouter());
    }

    private setAppSettings(): void {
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));
    }

    private setErrorHandlers(): void {
        this._app.use(errorHandler);
    }
}
