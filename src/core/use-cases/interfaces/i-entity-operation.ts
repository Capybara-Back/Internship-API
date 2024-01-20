import AcademicTutor from '@core/entities/academic-tutor.entity';
import CompanyTutor from '@core/entities/company-tutor.entity';
import Company from '@core/entities/company.entity';
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

export interface IInternshipRepository
    extends IWrite<Internship>,
        IRead<Internship> {}

export interface IRepository<T> extends IWrite<T>, IRead<T> {}

export interface ICompanyRepository extends IRepository<Company> {}

export interface IAcademicTutorRepository extends IRepository<AcademicTutor> {}

export interface ICompanyTutorRepository extends IRepository<CompanyTutor> {}
