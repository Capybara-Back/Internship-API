import { ICompanyTutorRepository } from '@core/use-cases/interfaces/i-entity-operation';
import DatabaseRepository from '../repository.abstract';
import CompanyTutor from '@core/entities/company-tutor.entity';
import CompanyTutorDbEntity from '../typeorm/entities/CompanyTutor';
import AcademicTutor from '@core/entities/academic-tutor.entity';
import IEntityMapper from '@core/lib/mappers/i-entity-mapper';
import { Repository } from 'typeorm';
import CompanyTutorMapper from '@core/lib/mappers/company-tutor.mapper';

export default class CompanyTutorRepository
    extends DatabaseRepository
    implements ICompanyTutorRepository
{
    private repository!: Repository<CompanyTutorDbEntity>;
    private _dataMapper: Pick<IEntityMapper<CompanyTutor, any>, 'toDomain'>;

    public constructor() {
        super();
        this.repository = this._db!.getRepository(CompanyTutorDbEntity);
        this._dataMapper = new CompanyTutorMapper();
    }

    async save(entity: CompanyTutor): Promise<CompanyTutor> {
        const entityToPersist = await this.repository.create(entity.toJSON());
        const savedEntity = await this.repository.save(entityToPersist);
        return this._dataMapper.toDomain(savedEntity);
    }

    async update(
        entity: CompanyTutor,
        id: string
    ): Promise<CompanyTutor | null> {
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

    async findAll(): Promise<CompanyTutor[]> {
        const results = await this.repository.find({
            relations: { user: true, company: true }
        });
        return results.map((entity) => this._dataMapper.toDomain(entity));
    }

    async findOne(id: string): Promise<CompanyTutor | null> {
        const result = await this.repository.findOne({ where: { id } });

        if (!result) {
            return null;
        }

        return this._dataMapper.toDomain(result);
    }
}
