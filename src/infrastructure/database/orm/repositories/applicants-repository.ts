import { IApplicantOperation } from 'src/core/use-cases/interfaces/i-entity-operation';
import DatabaseRepository from '../repository.abstract';
import { Applicant } from '../typeorm/entities';
import ApplicantEntity from '../../../../core/entities/applicant.entity';
import { AppDataSource } from '../typeorm/typeorm';
import IEntityMapper from 'src/core/lib/mappers/i-entity-mapper';

export default class ApplicantsRepository
    extends DatabaseRepository
    implements IApplicantOperation
{
    private repository = AppDataSource.getRepository(Applicant);

    private _dataMapper: Pick<IEntityMapper<ApplicantEntity, any>, 'toDomain'>;

    async save(entity: Applicant): Promise<ApplicantEntity> {
        const createdApplicant = await this.repository.create(entity);
        console.log(createdApplicant);

        return this._dataMapper.toDomain(createdApplicant);
    }

    update(entity: Applicant, id: string): Promise<ApplicantEntity | null> {
        console.log(entity);
        console.log(id);

        throw new Error('Method not implemented.');
    }

    delete(id: string): Promise<true | null> {
        console.log(id);

        throw new Error('Method not implemented.');
    }

    findAll(): Promise<ApplicantEntity[]> {
        throw new Error('Method not implemented.');
    }

    async findOne(id: string): Promise<ApplicantEntity | null> {
        console.log(id);

        const record: Applicant | null = await this.repository.findOneBy({
            id
        });

        return this._dataMapper.toDomain({ raw: JSON.stringify(record) });
    }
}
