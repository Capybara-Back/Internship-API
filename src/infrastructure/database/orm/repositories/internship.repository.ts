import { IInternshipRepository } from '@core/use-cases/interfaces/i-entity-operation';
import DatabaseRepository from '../repository.abstract';
import Internship from '@core/entities/internship.entity';
import InternshipDbEntity from '../typeorm/entities/Internship';
import { Repository } from 'typeorm';
import IEntityMapper from '@core/lib/mappers/i-entity-mapper';
import InternshipMapper from '@core/lib/mappers/internship.mapper';
import Student from '../typeorm/entities/Student';
import AcademicTutor from '../typeorm/entities/AcademicTutor';
import CompanyTutor from '../typeorm/entities/CompanyTutor';
import Company from '../typeorm/entities/Company';

export default class InternshipRepository
    extends DatabaseRepository
    implements IInternshipRepository
{
    private repository!: Repository<InternshipDbEntity>;
    private _dataMapper: Pick<IEntityMapper<Internship, any>, 'toDomain'>;

    public constructor() {
        super();
        this.repository = this._db!.getRepository(InternshipDbEntity);
        this._dataMapper = new InternshipMapper();
    }

    async save(entity: Internship): Promise<Internship> {
        const entityProps = entity.getProps();

        const entityToPersist = await this.repository.create({
            missionDescription: entityProps.missionDescription,
            title: entityProps.title,
            startDate: entityProps.startDate,
            endDate: entityProps.endDate
        });

        entityToPersist.student = new Student();
        entityToPersist.student.id = entityProps.studentId;
        entityToPersist.academicTutor = new AcademicTutor();
        entityToPersist.academicTutor.id = entityProps.academicTutorId;
        entityToPersist.companyTutor = new CompanyTutor();
        entityToPersist.companyTutor.id = entityProps.companyTutorId;
        entityToPersist.company = new Company();
        entityToPersist.company.name = entityProps.companyId;

        const savedEntity = await this.repository.save(entityToPersist);
        return this._dataMapper.toDomain(savedEntity);
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
                .leftJoinAndSelect('companyTutor.user', 'companyTutorUser')
                .leftJoinAndSelect('internship.academicTutor', 'academicTutor')
                .leftJoinAndSelect('academicTutor.user', 'academicTutorUser')
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
