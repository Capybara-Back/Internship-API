import IUseCase from '@core/interfaces/i-use-case';
import { IAddInternsipRequestModel } from '@core/interfaces/request-models/internship.request-model';
import Internship from '@core/entities/internship.entity';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import IEntityMapper from '@core/lib/mappers/i-entity-mapper';
import InternshipMapper from '@core/lib/mappers/internship.mapper';
import { IInternshipRepository } from '../interfaces/i-entity-operation';
import AcademicTutor from '@core/entities/academic-tutor.entity';
import CompanyTutor from '@core/entities/company-tutor.entity';
import Company from '@core/entities/company.entity';

export default class AddInternshipUseCase
    implements IUseCase<IAddInternsipRequestModel, IInternshipDto>
{
    private internshipRepository: IInternshipRepository;
    private dataMapper: IEntityMapper<Internship, IInternshipDto>;

    public constructor(internshipRepository: IInternshipRepository) {
        this.internshipRepository = internshipRepository;
        this.dataMapper = new InternshipMapper();
    }

    async perform(
        requestModel: IAddInternsipRequestModel
    ): Promise<IInternshipDto> {
        const internship = this.transformRequestModelIntoEntity(requestModel);
        const savedEntity = await this.internshipRepository.save(internship);
        return this.dataMapper.toDTO(savedEntity);
    }

    transformRequestModelIntoEntity(
        requestModel: IAddInternsipRequestModel
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
                          firstName: academicTutor.firstname,
                          lastName: academicTutor.lastName,
                          phoneNumber: academicTutor.phoneNumber,
                          mailAddress: academicTutor.mailAddress
                      })
                    : undefined,
            companyTutor:
                companyTutor != null
                    ? new CompanyTutor({
                          firstName: companyTutor.firstname,
                          lastName: companyTutor.lastName,
                          phoneNumber: companyTutor.phoneNumber,
                          mailAddress: companyTutor.mailAddress
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
