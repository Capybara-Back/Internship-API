import { ICompanyTutorDto } from '@core/interfaces/dtos/company-tutor.dto';
import IController from '../interfaces/i-controller';
import { ICompanyTutorRepository } from '@core/use-cases/interfaces/i-entity-operation';
import GetAllInternshipUseCase from '@core/use-cases/internships/get-all-internship.use-case';
import CompanyTutorMapper from '@core/lib/mappers/company-tutor.mapper';
import GetAllCompanyTutorsUseCase from '@core/use-cases/compagny-tutors/get-all-company-tutors.use-case';

export default class GetAllCompanyTutorsController
    implements IController<ICompanyTutorDto[]>
{
    private companyTutorRepository: ICompanyTutorRepository;

    public constructor(companyTutorRepository: ICompanyTutorRepository) {
        this.companyTutorRepository = companyTutorRepository;
    }

    processRequest(_: any): Promise<ICompanyTutorDto[]> {
        return new GetAllCompanyTutorsUseCase(
            this.companyTutorRepository
        ).perform(_);
    }
}
