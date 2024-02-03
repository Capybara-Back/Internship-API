import GetAllInternshipController from '@adapters/controllers/internships/get-all-internship.controller';
import Deliverer from '../interfaces/deliverer.abstract';
import InternshipRepository from '@infra/database/orm/repositories/internship.repository';
import { SuccessResponse } from '@common/contracts';

export default class GetAllInternshipDeliverer extends Deliverer {
    public async respond(): Promise<void> {
        const controller = new GetAllInternshipController(
            new InternshipRepository()
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
