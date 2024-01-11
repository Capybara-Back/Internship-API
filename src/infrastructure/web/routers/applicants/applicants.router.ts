import { GetApplicantDeliverer } from '../../delivery/applicants';
import RouterHandler from '../router.abstract';

export default class ApplicantsRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.get('/:id', this.handleRequest(GetApplicantDeliverer));
    }
}
