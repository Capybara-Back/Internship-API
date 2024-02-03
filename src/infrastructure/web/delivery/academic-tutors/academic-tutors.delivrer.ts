import AcademicTutorRepository from '@infra/database/orm/repositories/academic-tutor.repository';
import Deliverer from '../interfaces/deliverer.abstract';
import GetAllAcademicTutorsController from '@adapters/controllers/academic_tutors/get-all-academic-tutors.controller';
import { SuccessResponse } from '@common/contracts';

export default class GetAllAcademicTutorsDeliverer extends Deliverer {
    public async respond(): Promise<void> {
        const controller = new GetAllAcademicTutorsController(
            new AcademicTutorRepository()
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
