import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import Internship from './Internship';
import User from './User';

@Entity()
export default class AcademicTutor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    firstName: string;

    @Column('varchar')
    lastName: string;

    @Column('varchar')
    phoneNumber: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    schoolEmail: string;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    user?: User;

    @OneToMany(
        () => Internship,
        (internship: Internship) => internship.academicTutor
    )
    internships: Internship[];

    public constructor(id: string) {
        this.id = id;
    }
}
