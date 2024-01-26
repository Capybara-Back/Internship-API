import Company from '@core/entities/company.entity';
import { ICompanyDto } from '@core/interfaces/dtos/company.dto';
import EntityMapper from './entity.mapper';

export default class CompanyMapper
    extends EntityMapper<Company, ICompanyDto>
{
    public toDomain(raw: { [key: string]: any }): Company {
        return new Company({
            name: raw.name,
            address: raw.address,
            city: raw.city,
            zipCode: raw.zipCode,
        });
    }

    public toDTO(company: Company): any {
        return { ...company.getProps() };
    }
}
