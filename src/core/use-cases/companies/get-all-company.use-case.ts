import { ICompanyDto } from "@core/interfaces/dtos/company.dto";
import IUseCase from "@core/interfaces/i-use-case";
import CompanyMapper from "@core/lib/mappers/company.mapper";
import { ICompanyRepository } from "../interfaces/i-entity-operation";

export default class GetAllCompanyUseCase implements IUseCase<any, ICompanyDto[]> {
    private readonly companyMapper: CompanyMapper;

    constructor(private readonly companyRepository: ICompanyRepository) {
        this.companyMapper = new CompanyMapper();
    }

    public async perform(): Promise<ICompanyDto[]> {
        return (await this.companyRepository.findAll()).map((company) => this.companyMapper.toDTO(company));
    }
}