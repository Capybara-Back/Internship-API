import CompanyTutorRepository from '@infra/database/orm/repositories/company-tutor.repository';
import Deliverer from '../interfaces/deliverer.abstract';
import GetAllCompanyTutorsController from '@adapters/controllers/company_tutors/get-all-company-tutors.controller';
import { SuccessResponse } from '@common/contracts';

export default class GetAllCompanyTutorsDeliverer extends Deliverer {
    public async respond(): Promise<void> {
        const controller = new GetAllCompanyTutorsController(
            new CompanyTutorRepository()
        );

        const mappedHttpRequest = this.mapHttpRequest(this.req);

        controller.processRequest(mappedHttpRequest);

        try {
            const content = await controller.processRequest(mappedHttpRequest);
            this.res.send(SuccessResponse.create(content)).status(200);
        } catch (err: any) {
            this.handleError(err);
        }
    }
}
