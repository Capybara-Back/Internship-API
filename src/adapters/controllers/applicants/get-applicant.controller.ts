import { IGetApplicantRequestModel } from '../../../core/interfaces/request-models/applicant-request-models';
import IController from '../interfaces/i-controller';
import IHttpRequestModel from '../interfaces/i-http-request.model';
import GetApplicantUseCase from '../../../core/use-cases/applicants/get-applicant.use-case';
import { IGetApplicantResponseModel } from '../../../core/interfaces/response-models/applicant-response-models';
import IValidator from '../interfaces/i-validator';
import { EntityOperationDictionary } from 'src/core/use-cases/interfaces/i-entity-operation';

export default class GetApplicantController
    implements IController<IGetApplicantResponseModel>
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

    async processRequest(
        req: IHttpRequestModel
    ): Promise<IGetApplicantResponseModel> {
        console.log('body', req.body);

        const requestValidated =
            await this.validation.validate<IGetApplicantRequestModel>({
                id: req.params.id
            });

        if (requestValidated.isFailure) {
            throw requestValidated;
        }

        const useCaseRequestModel = requestValidated.getValue()!;

        console.log('Use case request model', useCaseRequestModel);

        const getApplicantUseCase = new GetApplicantUseCase(
            this.repositoryByResource
        );
        return await getApplicantUseCase.perform(useCaseRequestModel);
    }
}
