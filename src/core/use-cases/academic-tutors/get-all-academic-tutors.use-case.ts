import AcademicTutor from '@core/entities/academic-tutor.entity';
import { IAcademicTutorDto } from '@core/interfaces/dtos/academic-tutor.dto';
import IUseCase from '@core/interfaces/i-use-case';
import type { IGetAllAcademicTutorRequestModel } from '@core/interfaces/request-models/academic-tutor.request-model';
import AcademicTutorMapper from '@core/lib/mappers/academic-tutor.mapper';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import { IAcademicTutorRepository } from '@core/use-cases/interfaces/i-entity-operation';

export default class GetAllAcademicTutorsUseCase
    implements IUseCase<any, IAcademicTutorDto[]>
{
    private academicTutorRepository: IAcademicTutorRepository;
    private dataMapper: IEntityMapper<AcademicTutor, IAcademicTutorDto>;

    public constructor(academicTutorRepository: IAcademicTutorRepository) {
        this.academicTutorRepository = academicTutorRepository;
        this.dataMapper = new AcademicTutorMapper();
    }

    async perform(
        requestModel: IGetAllAcademicTutorRequestModel
    ): Promise<IAcademicTutorDto[]> {
        const options = requestModel.querySearch
            ? {
                  searchTerm: requestModel.querySearch
              }
            : undefined;
        const academicTutors =
            await this.academicTutorRepository.findAll(options);
        return academicTutors.map((item) => this.dataMapper.toDTO(item));
    }
}
