import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import Company from './Company';
import User from './User';

@Entity()
export default class EnterpriseTutor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    email: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Company, (company) => company.tutors)
    company: Company;
}
