import { ApplicantsRouter } from './applicants';
import RouterHandler from './router.abstract';

export default class MainRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.use('/applicants', new ApplicantsRouter().getRouter());
    }
}
