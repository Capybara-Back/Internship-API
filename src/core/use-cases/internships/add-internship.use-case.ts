import IUseCase from '@core/interfaces/i-use-case';
import { IAddInternshipRequestModel } from '@core/interfaces/request-models/internship.request-model';
import Internship from '@core/entities/internship.entity';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import IEntityMapper from '@core/lib/mappers/i-entity-mapper';
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

        const companyEntity = internship.getProps().company;
        const company = await this.tryToFindOneOrSaveCompany(
            companyEntity,
            internship?.getProps()?.companyId
        );

        const academicTutorEntity = internship.getProps().academicTutor;
        const academicTutor = await this.tryToFindOneOrSaveAcademicTutor(
            academicTutorEntity,
            internship?.getProps()?.academicTutorId
        );

        const companyTutorEntity = internship.getProps().companyTutor;
        const companyTutor = await this.tryToFindOneOrSaveCompanyTutor(
            companyTutorEntity,
            internship.getProps().companyTutorId
        );

        const entityWithRelation = new Internship({
            ...internship.getProps(),
            companyId: company!.getProps().name,
            academicTutorId: academicTutor.id || 'default',
            companyTutorId: companyTutor.id || 'default'
        });

        const savedEntity =
            await this.internshipRepository.save(entityWithRelation);
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
        companyTutorId?: string
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
        } else {
            return await this.companyTutorRepository.save(
                new CompanyTutor(companyTutor!.getProps())
            );
        }
    }

    transformRequestModelIntoEntity(
        requestModel: IAddInternshipRequestModel
    ): Internship {
        const {
            studentId,
            startDate,
            endDate,
            title,
            missionDescription,
            academicTutorId,
            academicTutor,
            companyTutorId,
            companyTutor,
            companyId,
            company
        } = requestModel;

        return new Internship({
            studentId,
            startDate,
            endDate,
            title,
            missionDescription,
            academicTutorId,
            companyTutorId,
            companyId,
            academicTutor:
                academicTutor != null
                    ? new AcademicTutor({
                          firstName: academicTutor.firstName,
                          lastName: academicTutor.lastName,
                          phoneNumber: academicTutor.phoneNumber,
                          email: academicTutor.email,
                          schoolEmail: academicTutor.email
                      })
                    : undefined,
            companyTutor:
                companyTutor != null
                    ? new CompanyTutor({
                          firstName: companyTutor.firstName,
                          lastName: companyTutor.lastName,
                          phoneNumber: companyTutor.phoneNumber,
                          email: companyTutor.email
                      })
                    : undefined,
            company:
                company != null
                    ? new Company({
                          name: company.name,
                          address: company.address,
                          city: company.city,
                          zipCode: company.zipCode
                      })
                    : undefined
        });
    }
}
