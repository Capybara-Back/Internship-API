import logger from '@common/logger';
import IUseCase from '@core/interfaces/i-use-case';
import { IAddInternsipRequestModel } from '@core/interfaces/request-models/internship.request-model';
import Internship from '@core/entities/internship.entity';
import { IInternshipDto } from '@core/interfaces/dtos/internship.dto';
import IEntityMapper from '@core/lib/mappers/i-entity-mapper';
import InternshipMapper from '@core/lib/mappers/internship.mapper';
import { IInternshipRepository } from '../interfaces/i-entity-operation';

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
        const { studentId, date, title, academicTutorId } = requestModel;

        const internship = Internship.create({
            academicTutorId,
            studentId,
            date,
            title
        });

        const savedEntity = await this.internshipRepository.save(internship);
        return this.dataMapper.toDTO(savedEntity);
    }
}
