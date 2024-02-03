import { ICompanyTutorDto } from '@core/interfaces/dtos/company-tutor.dto';
import IUseCase from '@core/interfaces/i-use-case';
import { ICompanyTutorRepository } from '../interfaces/i-entity-operation';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import CompanyTutor from '@core/entities/company-tutor.entity';
import CompanyTutorMapper from '@core/lib/mappers/company-tutor.mapper';

export default class GetAllCompanyTutorsUseCase
    implements IUseCase<any, ICompanyTutorDto[]>
{
    private companyTutorRepository: ICompanyTutorRepository;
    private dataMapper: IEntityMapper<CompanyTutor, ICompanyTutorDto>;

    public constructor(companyTutorRepository: ICompanyTutorRepository) {
        this.companyTutorRepository = companyTutorRepository;
        this.dataMapper = new CompanyTutorMapper();
    }

    async perform(_: any): Promise<ICompanyTutorDto[]> {
        const companyTutors = await this.companyTutorRepository.findAll();
        return companyTutors.map((item) => this.dataMapper.toDTO(item));
    }
}
