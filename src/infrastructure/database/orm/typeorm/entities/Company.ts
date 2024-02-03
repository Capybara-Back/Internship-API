import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import CompanyTutor from './CompanyTutor';
import Internship from './Internship';

@Entity()
export default class Company {
    @PrimaryColumn('varchar')
    name: string;

    @Column('varchar')
    address: string;

    @Column('varchar')
    city: string;

    @Column('varchar')
    zipCode: string;

    @OneToMany(() => CompanyTutor, (tutor) => tutor.company)
    tutors: CompanyTutor[];

    @OneToMany(() => Internship, (internship) => internship.company)
    internships: Internship[];

    public constructor(name: string) {
        this.name = name;
    }
}
