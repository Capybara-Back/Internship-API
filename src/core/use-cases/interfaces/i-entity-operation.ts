import Internship from '@core/entities/internship.entity';

interface IWrite<T> {
    save(entity: T): Promise<T>;
    update(entity: T, id: string): Promise<T | null>;
    delete(id: string): Promise<true | null>;
}

interface IRead<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
}

export default interface IEntityOperation extends IWrite<any>, IRead<any> {}

export type EntityOperationDictionary = Record<string, IEntityOperation>;

export interface IInternshipOperation
    extends IWrite<Internship>,
        IRead<Internship> {}
