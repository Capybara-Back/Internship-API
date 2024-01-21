import IController from '../interfaces/i-controller';
import IHttpRequestModel from '../interfaces/i-http-request.model';
import IValidator from '../interfaces/i-validator';
import AddDocumentUseCase from '@core/use-cases/documents/add-document.use-case';
import { IAddDocumentRequestModel } from '@core/interfaces/request-models/document.request-model';
import { IDocumentRepository } from '@core/use-cases/interfaces/i-entity-operation';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';

export default class AddInternshipController
    implements IController<IDocumentDto>
{
    private validation: IValidator;
    private documentRepository: IDocumentRepository;

    public constructor(
        validation: IValidator,
        documentRepository: IDocumentRepository
    ) {
        this.validation = validation;
        this.documentRepository = documentRepository;
    }

    async processRequest(req: IHttpRequestModel): Promise<IDocumentDto> {
        const requestValidated =
            await this.validation.validate<IAddDocumentRequestModel>(req.body);

        if (requestValidated.isFailure) {
            throw requestValidated.getError();
        }

        const useCaseRequestModel = requestValidated.getValue()!;

        const addDocumentUseCase = new AddDocumentUseCase(
            this.documentRepository
        );
        return await addDocumentUseCase.perform(useCaseRequestModel);
    }
}
