import {
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import Internship from './Internship';
import User from './User';

@Entity()
export default class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => Internship, (internship) => internship.student)
    internships: Internship[];
}
