import IEntityMapper from './interfaces/i-entity-mapper';

export default class EntityMapper<E, DTO> implements IEntityMapper<E, DTO> {
    toDTO(entity: E): DTO {
        throw new Error('Method not implemented.');
    }
    toDomain(raw: { [key: string]: any }): E {
        throw new Error('Method not implemented.');
    }
    toDomainWithRelation(raw: { [key: string]: any }): E {
        return this.toDomain(raw);
    }
}
