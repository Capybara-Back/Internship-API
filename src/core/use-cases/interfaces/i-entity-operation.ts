import Internship from '@core/entities/internship.entity';
import Document from '@core/entities/document.entity';

interface IWrite<T> {
    save(entity: T): Promise<T>;
    update(entity: T, id: string): Promise<T | null>;
    delete(id: string): Promise<true | null>;
}

interface IRead<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
}

export interface IInternshipRepository
    extends IWrite<Internship>,
        IRead<Internship> {}

export interface IDocumentRepository
    extends IWrite<Document>,
        IRead<Document> {}
