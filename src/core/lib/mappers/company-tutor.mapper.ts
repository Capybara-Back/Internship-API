import IEntityMapper from './i-entity-mapper';
import CompanyTutor from '@core/entities/company-tutor.entity';
import { ICompanyTutorDto } from '@core/interfaces/dtos/company-tutor.dto';

export default class CompanyTutorMapper
    implements IEntityMapper<CompanyTutor, ICompanyTutorDto>
{
    public toDomain(raw: { [key: string]: any }): CompanyTutor {
        return new CompanyTutor(
            {
                firstName: raw.user.firstName,
                lastName: raw.user.lastName,
                phoneNumber: raw.user.phoneNumber,
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
