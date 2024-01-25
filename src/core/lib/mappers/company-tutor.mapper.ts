import IEntityMapper from './i-entity-mapper';
import CompanyTutor from '@core/entities/company-tutor.entity';
import { ICompanyTutorDto } from '@core/interfaces/dtos/company-tutor.dto';

export default class CompanyTutorMapper
    implements IEntityMapper<CompanyTutor, ICompanyTutorDto>
{
    public toDomain(raw: { [key: string]: any }): CompanyTutor {
        return new CompanyTutor(
            {
                id: raw.id,
                firstName: raw.firstName,
                lastName: raw.lastName,
                phoneNumber: raw.phoneNumber,
                email: raw.email,
                companyName: raw.company.name
            },
            raw.id
        );
    }

    public toDTO(companyTutor: CompanyTutor): any {
        return { ...companyTutor.getProps() };
    }
}
