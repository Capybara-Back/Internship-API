import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Internship from './Internship';

@Entity()
export default class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Internship, (internship) => internship.student)
    internships: Internship[];
}
