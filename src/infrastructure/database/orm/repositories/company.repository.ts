import { ICompanyRepository } from '@core/use-cases/interfaces/i-entity-operation';
import DatabaseRepository from '../repository.abstract';
import Company from '@core/entities/company.entity';
import CompanyDbEntity from '../typeorm/entities/Company';
import { Repository } from 'typeorm';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import CompanyMapper from '@core/lib/mappers/company.mapper';
import logger from '@common/logger';

export default class CompanyRepository
    extends DatabaseRepository
    implements ICompanyRepository
{
    private repository!: Repository<CompanyDbEntity>;
    private _dataMapper: Pick<IEntityMapper<Company, any>, 'toDomain'>;

    public constructor() {
        super();
        this.repository = this._db!.getRepository(CompanyDbEntity);
        this._dataMapper = new CompanyMapper();
    }

    async save(entity: Company): Promise<Company> {
        const entityToPersist = await this.repository.create(entity.toJSON());

        const savedEntity = await this.repository.save(entityToPersist);
        return this._dataMapper.toDomain(savedEntity);
    }

    async update(entity: Company, id: string): Promise<Company | null> {
        const existingEntity = await this.repository.findOne({
            where: { name: id }
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

    async findAll(): Promise<Company[]> {
        const results = await this.repository.find();
        return results.map((entity) => this._dataMapper.toDomain(entity));
    }

    async findOne(id: string): Promise<Company | null> {
        const result = await this.repository.findOne({ where: { name: id } });

        if (!result) {
            return null;
        }

        return this._dataMapper.toDomain(result);
    }
}
