import AddInternsipController from '@adapters/controllers/internships/add-internship.controller';
import Deliverer from '../interfaces/deliverer.abstract';
import { addInternshipValidator } from '@adapters/validators/use-cases/internship';
import { SuccessResponse } from '@common/contracts';
import { InternshipsRepositoryFactory } from '@infra/database/factories';

export default class AddInternshipDeliverer extends Deliverer {
    public async respond(): Promise<void> {
        const internshipsRepository = new InternshipsRepositoryFactory().create(
            'POSTGRES'
        );

        const repositories = {
            internships: internshipsRepository
        };

        const addInternshipController = new AddInternsipController(
            addInternshipValidator,
            repositories
        );

        const mappedHttpRequest = this.mapHttpRequest(this.req);

        try {
            const content =
                await addInternshipController.processRequest(mappedHttpRequest);
            this.res.send(SuccessResponse.create(content)).status(200);
        } catch (err: any) {
            this.handleError(err);
        }
    }
}
