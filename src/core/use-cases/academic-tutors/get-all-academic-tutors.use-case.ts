import { IAcademicTutorDto } from '@core/interfaces/dtos/academic-tutor.dto';
import IUseCase from '@core/interfaces/i-use-case';
import { IAcademicTutorRepository } from '@core/use-cases/interfaces/i-entity-operation';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import AcademicTutor from '@core/entities/academic-tutor.entity';
import AcademicTutorMapper from '@core/lib/mappers/academic-tutor.mapper';

export default class GetAllAcademicTutorsUseCase
    implements IUseCase<any, IAcademicTutorDto[]>
{
    private academicTutorRepository: IAcademicTutorRepository;
    private dataMapper: IEntityMapper<AcademicTutor, IAcademicTutorDto>;

    public constructor(academicTutorRepository: IAcademicTutorRepository) {
        this.academicTutorRepository = academicTutorRepository;
        this.dataMapper = new AcademicTutorMapper();
    }

    async perform(_: any): Promise<IAcademicTutorDto[]> {
        const academicTutors = await this.academicTutorRepository.findAll();
        return academicTutors.map((item) => this.dataMapper.toDTO(item));
    }
}
