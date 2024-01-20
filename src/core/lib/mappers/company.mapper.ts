import Company from '@core/entities/company.entity';
import { ICompanyDto } from '@core/interfaces/dtos/company.dto';
import IEntityMapper from './i-entity-mapper';

export default class CompanyMapper
    implements IEntityMapper<Company, ICompanyDto>
{
    public toDomain(raw: { [key: string]: any }): Company {
        return new Company({
            name: raw.name,
            address: raw.address,
            city: raw.city,
            zipCode: raw.zipCode
        });
    }

    public toDTO(company: Company): any {
        return { ...company.getProps() };
    }
}
