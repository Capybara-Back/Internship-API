import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import AcademicTutor from './AcademicTutor';
import Company from './Company';
import CompanyTutor from './CompanyTutor';
import Document from './Document';
import Student from './Student';

enum InternshipStatus {
    PENDING = 'pending',
    VALIDATED = 'validated',
    REJECTED = 'rejected'
}

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

    @Column('numeric')
    salary: number;

    @Column({
        type: 'enum',
        enum: InternshipStatus,
        nullable: true,
        default: InternshipStatus.PENDING
    })
    status: InternshipStatus;

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

    @OneToMany(() => Document, (document) => document.internship)
    documents: Document[];

    public constructor(id: string) {
        this.id = id;
    }
}
