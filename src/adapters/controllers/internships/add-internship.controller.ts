import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import { IAddInternshipRequestModel } from '@core/interfaces/request-models/internship.request-model';
import {
    IAcademicTutorRepository,
    ICompanyRepository,
    ICompanyTutorRepository,
    IInternshipRepository
} from '@core/use-cases/interfaces/i-entity-operation';
import AddInternshipUseCase from '@core/use-cases/internships/add-internship.use-case';
import IController from '../interfaces/i-controller';
import IHttpRequestModel from '../interfaces/i-http-request.model';
import IValidator from '../interfaces/i-validator';

export default class AddInternshipController
    implements IController<IInternshipDto>
{
    private validation: IValidator;
    private internshipRepository: IInternshipRepository;
    private companyRepository: ICompanyRepository;
    private academicTutorRepository: IAcademicTutorRepository;
    private companyTutorRepository: ICompanyTutorRepository;

    public constructor(
        validation: IValidator,
        internshipRepository: IInternshipRepository,
        companyRepository: ICompanyRepository,
        academicTutorRepository: IAcademicTutorRepository,
        companyTutorRepository: ICompanyTutorRepository
    ) {
        this.validation = validation;
        this.internshipRepository = internshipRepository;
        this.companyRepository = companyRepository;
        this.academicTutorRepository = academicTutorRepository;
        this.companyTutorRepository = companyTutorRepository;
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
            this.internshipRepository,
            this.companyRepository,
            this.academicTutorRepository,
            this.companyTutorRepository
        );
        return await addInternshipUseCase.perform(useCaseRequestModel);
    }
}
