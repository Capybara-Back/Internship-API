import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import AcademicTutor from './AcademicTutor';
import Student from './Student';

@Entity()
export default class Internship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    title: string;

    @Column('date')
    date: Date;

    @ManyToOne(() => Student, (student) => student.internships)
    student: Student;

    @ManyToOne(
        () => AcademicTutor,
        (academicTutor) => academicTutor.internships
    )
    academicTutor: AcademicTutor;
}
