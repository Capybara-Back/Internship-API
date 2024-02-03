import { IInternshipDto } from '../../interfaces/dtos/internship.dto';
import IUseCase from '../../interfaces/i-use-case';
import { IInternshipRepository } from '../interfaces/i-entity-operation';
import IEntityMapper from '../../lib/mappers/interfaces/i-entity-mapper';
import Internship from '../../entities/internship.entity';
import InternshipMapper from '../../lib/mappers/internship.mapper';

export default class GetAllInternshipUseCase
    implements IUseCase<any, IInternshipDto[]>
{
    private internshipRepository: IInternshipRepository;
    private dataMapper: IEntityMapper<Internship, IInternshipDto>;

    public constructor(internshipRepository: IInternshipRepository) {
        this.internshipRepository = internshipRepository;
        this.dataMapper = new InternshipMapper();
    }

    async perform(_: any): Promise<IInternshipDto[]> {
        const internships = await this.internshipRepository.findAll();
        return internships.map((item) => this.dataMapper.toDTO(item));
    }
}
