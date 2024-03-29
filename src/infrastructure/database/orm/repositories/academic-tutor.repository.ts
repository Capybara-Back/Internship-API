import AcademicTutor from '@core/entities/academic-tutor.entity';
import AcademicTutorMapper from '@core/lib/mappers/academic-tutor.mapper';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import {
    IAcademicTutorRepository,
    type IFindOptions
} from '@core/use-cases/interfaces/i-entity-operation';
import { Like, Repository } from 'typeorm';
import DatabaseRepository from '../repository.abstract';
import AcademicTutorDbEntity from '../typeorm/entities/AcademicTutor';

export default class AcademicTutorRepository
    extends DatabaseRepository
    implements IAcademicTutorRepository
{
    private repository!: Repository<AcademicTutorDbEntity>;
    private _dataMapper: Pick<IEntityMapper<AcademicTutor, any>, 'toDomain'>;

    public constructor() {
        super();
        this.repository = this._db!.getRepository(AcademicTutorDbEntity);
        this._dataMapper = new AcademicTutorMapper();
    }

    async save(entity: AcademicTutor): Promise<AcademicTutor> {
        const entityToPersist = await this.repository.create(entity.toJSON());

        const savedEntity = await this.repository.save(entityToPersist);
        return this._dataMapper.toDomain(savedEntity);
    }

    async update(
        entity: AcademicTutor,
        id: string
    ): Promise<AcademicTutor | null> {
        const existingEntity = await this.repository.findOne({
            where: { id }
        });

        if (!existingEntity) {
            return null;
        }

        const entityToUpdate = await this.repository.create(entity.toJSON());

        await this.repository.save(entityToUpdate);
        return this._dataMapper.toDomain(entityToUpdate);
    }

    async delete(id: string): Promise<true | null> {
        const result = await this.repository.delete(id);

        if (result.affected === 0) {
            return null;
        }

        return true;
    }

    async findAll(options?: IFindOptions): Promise<AcademicTutor[]> {
        const findOption = options?.searchTerm
            ? {
                  where: [
                      { firstName: Like(`${options.searchTerm}%`) },
                      { lastName: Like(`${options.searchTerm}%`) }
                  ]
              }
            : undefined;
        const results = await this.repository.find(findOption);
        return results.map((entity) => this._dataMapper.toDomain(entity));
    }

    async findOne(id: string): Promise<AcademicTutor | null> {
        const result = await this.repository.findOne({ where: { id } });

        if (!result) {
            return null;
        }

        return this._dataMapper.toDomain(result);
    }
}
