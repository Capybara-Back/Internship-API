import GetAllCompanyTutorsDeliverer from '@infra/web/delivery/company-tutors/company-tutors.delivrer';
import RouterHandler from '../router.abstract';

export default class CompanyTutorRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.get('/', this.handleRequest(GetAllCompanyTutorsDeliverer));
    }
}
