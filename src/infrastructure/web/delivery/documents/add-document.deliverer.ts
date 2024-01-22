import AddDocumentController from '@adapters/controllers/documents/add-document.controller';
import Deliverer from '../interfaces/deliverer.abstract';
import { addDocumentValidator } from '@adapters/validators/use-cases/document';
import { SuccessResponse } from '@common/contracts';
import DocumentRepository from '../../../database/orm/repositories/document.repository';
import InternshipRepository from '../../../database/orm/repositories/internship.repository';

export default class AddDocumentDeliverer extends Deliverer {
    public async respond(): Promise<void> {
        const addDocumentController = new AddDocumentController(
            addDocumentValidator,
            new DocumentRepository(),
            new InternshipRepository()
        );

        const mappedHttpRequest = this.mapHttpRequest(this.req);

        try {
            const content =
                await addDocumentController.processRequest(mappedHttpRequest);
            this.res.send(SuccessResponse.create(content)).status(200);
        } catch (err: any) {
            this.handleError(err);
        }
    }
}
