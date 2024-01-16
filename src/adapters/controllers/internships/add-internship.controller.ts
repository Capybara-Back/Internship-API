import IController from '../interfaces/i-controller';
import IHttpRequestModel from '../interfaces/i-http-request.model';
import IValidator from '../interfaces/i-validator';
import AddInternshipUseCase from '@core/use-cases/internships/add-internship.use-case';
import { IAddInternsipRequestModel } from '@core/interfaces/request-models/internship.request-model';
import { EntityOperationDictionary } from '@core/use-cases/interfaces/i-entity-operation';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';

export default class AddInternsipController
    implements IController<IInternshipDto>
{
    private validation: IValidator;
    private repositoryByResource: EntityOperationDictionary;

    public constructor(
        validation: IValidator,
        repositoryByResource: EntityOperationDictionary
    ) {
        this.validation = validation;
        this.repositoryByResource = repositoryByResource;
    }

    async processRequest(req: IHttpRequestModel): Promise<IInternshipDto> {
        const requestValidated =
            await this.validation.validate<IAddInternsipRequestModel>(req.body);

        if (requestValidated.isFailure) {
            throw requestValidated.getError();
        }

        const useCaseRequestModel = requestValidated.getValue()!;

        const addInternshipUseCase = new AddInternshipUseCase(
            this.repositoryByResource
        );
        return await addInternshipUseCase.perform(useCaseRequestModel);
    }
}
