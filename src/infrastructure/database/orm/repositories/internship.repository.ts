import logger from '@common/logger';
import Internship from '@core/entities/internship.entity';
import IEntityMapper from '@core/lib/mappers/interfaces/i-entity-mapper';
import InternshipMapper from '@core/lib/mappers/internship.mapper';
import { IInternshipRepository } from '@core/use-cases/interfaces/i-entity-operation';
import { Repository } from 'typeorm';
import DatabaseRepository from '../repository.abstract';
import AcademicTutor from '../typeorm/entities/AcademicTutor';
import Company from '../typeorm/entities/Company';
import CompanyTutor from '../typeorm/entities/CompanyTutor';
import InternshipDbEntity from '../typeorm/entities/Internship';
import Student from '../typeorm/entities/Student';

export default class InternshipRepository
    extends DatabaseRepository
    implements IInternshipRepository {
    private repository!: Repository<InternshipDbEntity>;
    private _dataMapper: Pick<IEntityMapper<Internship, any>, 'toDomain'>;

    public constructor() {
        super();
        this.repository = this._db!.getRepository(InternshipDbEntity);
        this._dataMapper = new InternshipMapper();
    }

    async save(entity: Internship): Promise<Internship> {
        try {
            const entityProps = entity.getProps();

            if (
                entityProps.academicTutor?.id === undefined ||
                entityProps.companyTutor?.id === undefined ||
                entityProps.company?.getProps().name === undefined
            ) {
                throw new Error(
                    'Internship must have academic tutor, company tutor and company ids'
                );
            }

            const entityToPersist = await this.repository.create({
                missionDescription: entityProps.missionDescription,
                title: entityProps.title,
                startDate: entityProps.startDate,
                endDate: entityProps.endDate,
                salary: entityProps.salary,
                student: new Student(entityProps.studentId),
                academicTutor: new AcademicTutor(entityProps.academicTutor.id),
                companyTutor: new CompanyTutor(entityProps.companyTutor.id),
                company: new Company(entityProps.company?.getProps().name)
            });
            const savedEntity = await this.repository.save(entityToPersist);
            return this._dataMapper.toDomain(savedEntity);
        } catch (error: any) {
            logger.error(error?.message || error);
            throw new Error('Internship saving was unsuccessfull');
        }
    }

    async update(entity: Internship, id: string): Promise<Internship | null> {
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

    async findAll(): Promise<Internship[]> {
        return (
            await this.repository
                .createQueryBuilder('internship')
                .leftJoinAndSelect('internship.student', 'studentId')
                .leftJoinAndSelect('internship.company', 'company')
                .leftJoinAndSelect('internship.companyTutor', 'companyTutor')
                .leftJoinAndSelect('internship.academicTutor', 'academicTutor')
                .getMany()
        ).map((entity) => this._dataMapper.toDomain(entity));
    }

    async findOne(id: string): Promise<Internship | null> {
        const result = await this.repository.findOne({ where: { id } });

        if (!result) {
            return null; // Entity with the given id not found
        }

        return this._dataMapper.toDomain(result);
    }
}
