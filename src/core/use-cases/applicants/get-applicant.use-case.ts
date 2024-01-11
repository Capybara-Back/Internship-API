import IUseCase from '../../interfaces/i-use-case';
import { IGetApplicantRequestModel } from '../../interfaces/request-models/applicant-request-models';
import { IGetApplicantResponseModel } from '../../interfaces/response-models/applicant-response-models';
import { EntityOperationDictionary } from '../interfaces/i-entity-operation';

export default class GetApplicantUseCase
    implements IUseCase<IGetApplicantRequestModel, IGetApplicantResponseModel>
{
    private repositoryByResource: EntityOperationDictionary;

    public constructor(repositoryByResource: EntityOperationDictionary) {
        this.repositoryByResource = repositoryByResource;
    }

    perform(
        requestModel: IGetApplicantRequestModel
    ): Promise<IGetApplicantResponseModel> {
        this.repositoryByResource.applicants.findOne(requestModel.id);
        console.log(requestModel);
        return new Promise((resolve) => {
            resolve({ id: '3' });
        });
    }
}
