import IController from '../interfaces/i-controller';
import IHttpRequestModel from '../interfaces/i-http-request.model';
import IValidator from '../interfaces/i-validator';
import AddDocumentUseCase from '@core/use-cases/documents/add-document.use-case';
import { IAddDocumentFormData, IAddDocumentRequestModel } from '@core/interfaces/request-models/document.request-model';
import { IDocumentRepository } from '@core/use-cases/interfaces/i-entity-operation';
import { IDocumentDto } from '@core/interfaces/dtos/document.dto';
import { IUploadDocumentsService } from '@core/lib/services/i-upload-documents.service';
import { ValidationError } from '@common/errors';

export default class AddInternshipController
    implements IController<IDocumentDto[]>
{
    private validation: IValidator;
    private documentRepository: IDocumentRepository;
    private uploadDocumentsService: IUploadDocumentsService;

    public constructor(
        validation: IValidator,
        documentRepository: IDocumentRepository,
        uploadDocumentsService: IUploadDocumentsService
    ) {
        this.validation = validation;
        this.documentRepository = documentRepository;
        this.uploadDocumentsService = uploadDocumentsService;
    }

    async processRequest(req: IHttpRequestModel): Promise<IDocumentDto[]> {
        if(req.params.internshipId === undefined) {
            throw new ValidationError('Internship id is required');
        }
        const requestValidated =
            await this.validation.validate<IAddDocumentRequestModel>(req.body);

        if (requestValidated.isFailure) {
            throw requestValidated.getError();
        }

        const useCaseRequestModel = JSON.parse(requestValidated.getValue()!.data) as IAddDocumentFormData;
        useCaseRequestModel.internshipId = req.params.internshipId;

        if (!req.files) {
            throw new ValidationError('No files given to upload');
        }
        
        useCaseRequestModel.documents = req.files.map((file) => ({
            name: file.filename,
            type: file.mimetype,
            path: file.path
        }));

        const addDocumentUseCase = new AddDocumentUseCase(
            this.documentRepository,
            this.uploadDocumentsService
        );
        return await addDocumentUseCase.perform(useCaseRequestModel);
    }
}
