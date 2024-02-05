import GetAllCompanyDeliverer from "@infra/web/delivery/companies/get-all-company.deliverer";
import RouterHandler from "../router.abstract";

export default class CompanyRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.get('/', this.handleRequest(GetAllCompanyDeliverer));
    }
}