import { IDocumentRepository } from '@core/use-cases/interfaces/i-entity-operation';
import DatabaseRepository from '../repository.abstract';
import Document from '@core/entities/document.entity';
import DocumentDbEntity from '../typeorm/entities/Document';
import { Repository } from 'typeorm';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import DocumentMapper from '@core/lib/mappers/document.mapper';
import Internship from '../typeorm/entities/Internship';

export default class DocumentRepository
    extends DatabaseRepository
    implements IDocumentRepository
{
    private repository!: Repository<DocumentDbEntity>;
    private _dataMapper: Pick<IEntityMapper<Document, any>, 'toDomain'>;

    public constructor() {
        super();
        this.repository = this._db!.getRepository(DocumentDbEntity);
        this._dataMapper = new DocumentMapper();
    }

    async save(entity: Document): Promise<Document> {
        const entityProps = entity.getProps();

        const entityToPersist = await this.repository.create(entityProps);
        entityToPersist.internship = new Internship(entityProps.internshipId);

        const savedEntity = await this.repository.save(entityToPersist);
        return this._dataMapper.toDomain(savedEntity);
    }

    async insertMany(entities: Document[]): Promise<Document[]> {
        const entitiesToPersist = entities.map((entity) => {
            const entityProps = entity.getProps();
            const entityToPersist = this.repository.create(entityProps);
            entityToPersist.internship = new Internship(
                entityProps.internshipId
            );
            return entityToPersist;
        });
        const savedEntities = await this.repository.save(entitiesToPersist);
        return savedEntities.map((entity) => this._dataMapper.toDomain(entity));
    }

    async update(entity: Document, id: string): Promise<Document | null> {
        const existingEntity = await this.repository.findOne({ where: { id } });

        if (!existingEntity) {
            return null;
        }

        const entityToUpdate = await this.repository.create(entity);

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

    async findAll(): Promise<Document[]> {
        const results = await this.repository.find();
        return results.map((entity) => this._dataMapper.toDomain(entity));
    }

    async findOne(id: string): Promise<Document | null> {
        const result = await this.repository.findOne({ where: { id } });

        if (!result) {
            return null; // Entity with the given id not found
        }

        return this._dataMapper.toDomain(result);
    }
}
