import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import IController from '../interfaces/i-controller';
import IHttpRequestModel from '../interfaces/i-http-request.model';
import { IInternshipRepository } from '@core/use-cases/interfaces/i-entity-operation';
import GetAllInternshipUseCase from '@core/use-cases/internships/get-all-internship.use-case';

export default class GetAllInternshipController
    implements IController<IInternshipDto[]>
{
    private internshipRepository: IInternshipRepository;

    public constructor(internshipRepository: IInternshipRepository) {
        this.internshipRepository = internshipRepository;
    }

    processRequest(_: IHttpRequestModel): Promise<IInternshipDto[]> {
        return new GetAllInternshipUseCase(this.internshipRepository).perform(
            _
        );
    }
}
