import GetAllCompanyController from "@adapters/controllers/companies/get-all-company.controller";
import { SuccessResponse } from "@common/contracts";
import CompanyRepository from "@infra/database/orm/repositories/company.repository";
import Deliverer from "../interfaces/deliverer.abstract";

export default class GetAllCompanyDeliverer extends Deliverer {
    public async respond(): Promise<void> {
        const getAllCompanyController = new GetAllCompanyController(
            new CompanyRepository()
        );

        try {
            const content =
                await getAllCompanyController.processRequest();
            this.res.send(SuccessResponse.create(content)).status(200);
        } catch (err: any) {
            this.handleError(err);
        }
    }
}