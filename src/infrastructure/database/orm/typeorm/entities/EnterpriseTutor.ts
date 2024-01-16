import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Company from './Company';

@Entity()
export default class EnterpriseTutor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    email: string;

    @ManyToOne(() => Company, (company) => company.tutors)
    company: Company;
}
