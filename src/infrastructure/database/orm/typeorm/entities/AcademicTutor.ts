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
    schoolEmail: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(
        () => Internship,
        (internship: Internship) => internship.academicTutor
    )
    internships: Internship[];
}
