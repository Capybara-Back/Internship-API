import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import CompanyTutor from './CompanyTutor';
import Internship from './Internship';

@Entity()
export default class Company {
    @PrimaryColumn('varchar')
    name: string;

    @OneToMany(() => CompanyTutor, (tutor) => tutor.company)
    tutors: CompanyTutor[];

    @OneToMany(() => Internship, (internship) => internship.company)
    internships: Internship[];
}
