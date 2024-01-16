import { AddInternshipDeliverer } from '@infra/web/delivery/internships';
import RouterHandler from '../router.abstract';

export default class InternshipRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.post('/', this.handleRequest(AddInternshipDeliverer));
    }
}
