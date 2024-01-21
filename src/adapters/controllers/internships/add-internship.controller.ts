import IController from '../interfaces/i-controller';
import IHttpRequestModel from '../interfaces/i-http-request.model';
import IValidator from '../interfaces/i-validator';
import AddInternshipUseCase from '@core/use-cases/internships/add-internship.use-case';
import { IAddInternshipRequestModel } from '@core/interfaces/request-models/internship.request-model';
import { IInternshipRepository } from '@core/use-cases/interfaces/i-entity-operation';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';

export default class AddInternshipController
    implements IController<IInternshipDto>
{
    private validation: IValidator;
    private internshipRepository: IInternshipRepository;

    public constructor(
        validation: IValidator,
        internshipRepository: IInternshipRepository
    ) {
        this.validation = validation;
        this.internshipRepository = internshipRepository;
    }

    async processRequest(req: IHttpRequestModel): Promise<IInternshipDto> {
        const requestValidated =
            await this.validation.validate<IAddInternshipRequestModel>(
                req.body
            );

        if (requestValidated.isFailure) {
            throw requestValidated.getError();
        }

        const useCaseRequestModel = requestValidated.getValue()!;

        const addInternshipUseCase = new AddInternshipUseCase(
            this.internshipRepository
        );
        return await addInternshipUseCase.perform(useCaseRequestModel);
    }
}
