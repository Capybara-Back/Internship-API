import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Internship from './Internship';

@Entity()
export default class AcademicTutor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    schoolEmail: string;

    @OneToMany(
        () => Internship,
        (internship: Internship) => internship.academicTutor
    )
    internships: Internship[];
}
