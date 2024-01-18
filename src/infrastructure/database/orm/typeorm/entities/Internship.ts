import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import AcademicTutor from './AcademicTutor';
import Student from './Student';
import CompanyTutor from './CompanyTutor';
import Company from './Company';

@Entity()
export default class Internship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    title: string;

    @Column('varchar')
    missionDescription: string;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @ManyToOne(() => Student, (student) => student.internships)
    student: Student;

    @ManyToOne(
        () => AcademicTutor,
        (academicTutor) => academicTutor.internships
    )
    academicTutor: AcademicTutor;

    @ManyToOne(() => CompanyTutor, (companyTutor) => companyTutor.internships)
    companyTutor: CompanyTutor;

    @ManyToOne(() => Company, (company) => company.internships)
    company: Company;
}
