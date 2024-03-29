import AddInternshipController from '@adapters/controllers/internships/add-internship.controller';
import { addInternshipValidator } from '@adapters/validators/use-cases/internship';
import { SuccessResponse } from '@common/contracts';
import AcademicTutorRepository from '../../../database/orm/repositories/academic-tutor.repository';
import CompanyTutorRepository from '../../../database/orm/repositories/company-tutor.repository';
import CompanyRepository from '../../../database/orm/repositories/company.repository';
import InternshipRepository from '../../../database/orm/repositories/internship.repository';
import Deliverer from '../interfaces/deliverer.abstract';

export default class AddInternshipDeliverer extends Deliverer {
    public async respond(): Promise<void> {
        const addInternshipController = new AddInternshipController(
            addInternshipValidator,
            new InternshipRepository(),
            new CompanyRepository(),
            new AcademicTutorRepository(),
            new CompanyTutorRepository()
        );

        const mappedHttpRequest = this.mapHttpRequest(this.req);

        try {
            const content =
                await addInternshipController.processRequest(mappedHttpRequest);
            this.res.send(SuccessResponse.create(content)).status(201);
        } catch (err: any) {
            this.handleError(err);
        }
    }
}
