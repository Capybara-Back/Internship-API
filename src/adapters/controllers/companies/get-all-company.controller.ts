import { ICompanyDto } from "@core/interfaces/dtos/company.dto";
import GetAllCompanyUseCase from "@core/use-cases/companies/get-all-company.use-case";
import { ICompanyRepository } from "@core/use-cases/interfaces/i-entity-operation";
import IController from "../interfaces/i-controller";

export default class GetAllCompanyController implements IController<ICompanyDto[]> {

    constructor(private readonly companyRepository: ICompanyRepository) { }

    public async processRequest(): Promise<ICompanyDto[]> {
        return await new GetAllCompanyUseCase(this.companyRepository).perform();
    }
}