import { IInternshipOperation } from '@core/use-cases/interfaces/i-entity-operation';
import RepositoryFactory from './interfaces/respository-factory.abstract';
import InternshipRepository from '../orm/repositories/internship.repository';

export default class InternshipsRepositoryFactory extends RepositoryFactory<IInternshipOperation> {
    public create(dbDialect: string): IInternshipOperation {
        const applicantsRepositoryByDialect = {
            ['POSTGRES']: () => new InternshipRepository()
        };

        const repository = this.selectRepository(
            applicantsRepositoryByDialect,
            dbDialect
        );

        return repository();
    }
}
