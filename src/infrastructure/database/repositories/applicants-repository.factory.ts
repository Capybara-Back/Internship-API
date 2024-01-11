import { IApplicantOperation } from 'src/core/use-cases/interfaces/i-entity-operation';
import RepositoryFactory from './interfaces/respository-factory.asbtract';
import ApplicantsRepository from '../orm/repositories/applicants-repository';

export default class ApplicantsRepositoryFactory extends RepositoryFactory<IApplicantOperation> {
    public create(dbDialect: string): IApplicantOperation {
        const applicantsRepositoryByDialect = {
            ['POSTGRES']: () => new ApplicantsRepository()
        };

        const repository = this.selectRepository(
            applicantsRepositoryByDialect,
            dbDialect
        );

        return repository();
    }
}
