import IUseCase from '@core/interfaces/i-use-case';
import { IAddInternshipRequestModel } from '@core/interfaces/request-models/internship.request-model';
import Internship from '@core/entities/internship.entity';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import InternshipMapper from '@core/lib/mappers/internship.mapper';
import {
    IAcademicTutorRepository,
    ICompanyRepository,
    ICompanyTutorRepository,
    IInternshipRepository
} from '../interfaces/i-entity-operation';
import AcademicTutor from '@core/entities/academic-tutor.entity';
import CompanyTutor from '@core/entities/company-tutor.entity';
import Company from '@core/entities/company.entity';
import { ValueNotFoundError } from '@common/errors';

export default class AddInternshipUseCase
    implements IUseCase<IAddInternshipRequestModel, IInternshipDto>
{
    private internshipRepository: IInternshipRepository;
    private companyRepository: ICompanyRepository;
    private academicTutorRepository: IAcademicTutorRepository;
    private companyTutorRepository: ICompanyTutorRepository;
    private dataMapper: IEntityMapper<Internship, IInternshipDto>;

    public constructor(
        internshipRepository: IInternshipRepository,
        companyRepository: ICompanyRepository,
        academicTutorRepository: IAcademicTutorRepository,
        companyTutorRepository: ICompanyTutorRepository
    ) {
        this.internshipRepository = internshipRepository;
        this.companyRepository = companyRepository;
        this.academicTutorRepository = academicTutorRepository;
        this.companyTutorRepository = companyTutorRepository;
        this.dataMapper = new InternshipMapper();
    }

    async perform(
        requestModel: IAddInternshipRequestModel
    ): Promise<IInternshipDto> {
        const internship = this.transformRequestModelIntoEntity(requestModel);

        const company = await this.tryToFindOneOrSaveCompany(
            internship.getCompany(),
            requestModel.companyId
        );

        internship.setCompany(company);

        const academicTutor = await this.tryToFindOneOrSaveAcademicTutor(
            internship.getAcademicTutor(),
            requestModel.academicTutorId
        );

        internship.setAcademicTutor(academicTutor);

        const companyTutor = await this.tryToFindOneOrSaveCompanyTutor(
            internship.getCompanyTutor(),
            requestModel.companyTutorId,
            company.getProps().name
        );
        internship.setCompanyTutor(companyTutor);

        const savedEntity = await this.internshipRepository.save(internship);
        savedEntity.setCompany(company);
        savedEntity.setAcademicTutor(academicTutor);
        savedEntity.setCompanyTutor(companyTutor);
        return this.dataMapper.toDTO(savedEntity);
    }

    private async tryToFindOneOrSaveCompany(
        company?: Company,
        companyId?: string
    ): Promise<Company> {
        if (companyId) {
            const foundCompany =
                await this.companyRepository.findOne(companyId);

            if (!foundCompany) {
                throw new ValueNotFoundError(
                    `The company ${companyId} does not exist`
                );
            }
            return foundCompany;
        } else {
            return await this.companyRepository.save(
                new Company(company!.getProps())
            );
        }
    }

    private async tryToFindOneOrSaveAcademicTutor(
        academicTutor?: AcademicTutor,
        academicTutorId?: string
    ): Promise<AcademicTutor> {
        if (academicTutorId) {
            const foundAcademicTutor =
                await this.academicTutorRepository.findOne(academicTutorId);

            if (!foundAcademicTutor) {
                throw new ValueNotFoundError(
                    `The academic tutor ${academicTutorId} does not exist`
                );
            }

            return foundAcademicTutor;
        } else {
            return await this.academicTutorRepository.save(
                new AcademicTutor(academicTutor!.getProps())
            );
        }
    }

    private async tryToFindOneOrSaveCompanyTutor(
        companyTutor?: CompanyTutor,
        companyTutorId?: string,
        companyId?: string
    ): Promise<CompanyTutor> {
        if (companyTutorId) {
            const foundCompanyTutor =
                await this.companyTutorRepository.findOne(companyTutorId);

            if (!foundCompanyTutor) {
                throw new ValueNotFoundError(
                    `The company tutor ${companyTutorId} does not exist`
                );
            }

            return foundCompanyTutor;
        } else if (companyTutor != null) {
            companyTutor.setCompanyName(companyId!);
            return await this.companyTutorRepository.save(companyTutor);
        }
        throw new ValueNotFoundError(
            'Company tutor id or company tutor must be provided'
        );
    }

    transformRequestModelIntoEntity(
        requestModel: IAddInternshipRequestModel
    ): Internship {
        const { studentId, startDate, endDate, title, missionDescription } =
            requestModel;

        const internship = new Internship({
            studentId,
            startDate,
            endDate,
            title,
            missionDescription
        });

        if (requestModel.academicTutor) {
            internship.setAcademicTutor(
                new AcademicTutor({
                    ...requestModel.academicTutor,
                    schoolEmail: requestModel.academicTutor.email
                })
            );
        }

        if (requestModel.companyTutor) {
            internship.setCompanyTutor(
                new CompanyTutor({ ...requestModel.companyTutor })
            );
        }

        if (requestModel.company) {
            internship.setCompany(new Company({ ...requestModel.company }));
        }

        return internship;
    }
}
