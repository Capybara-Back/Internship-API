import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import Company from './Company';
import User from './User';
import Internship from './Internship';

@Entity()
export default class CompanyTutor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    email: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Company, (company) => company.tutors)
    company: Company;

    @OneToMany(
        () => Internship,
        (internship: Internship) => internship.companyTutor
    )
    internships: Internship[];
}
