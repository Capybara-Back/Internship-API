import CompanyTutor from '@core/entities/company-tutor.entity';
import { ICompanyTutorDto } from '@core/interfaces/dtos/company-tutor.dto';
import EntityMapper from './entity.mapper';

export default class CompanyTutorMapper extends EntityMapper<
    CompanyTutor,
    ICompanyTutorDto
> {
    public toDomain(raw: { [key: string]: any }): CompanyTutor {
        return new CompanyTutor(
            {
                id: raw.id,
                firstName: raw.firstName,
                lastName: raw.lastName,
                phoneNumber: raw.phoneNumber,
                email: raw.email
            },
            raw.id
        );
    }

    public toDTO(companyTutor: CompanyTutor): any {
        return { ...companyTutor.getProps() };
    }
}
