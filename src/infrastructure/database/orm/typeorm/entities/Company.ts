import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import EnterpriseTutor from './EnterpriseTutor';

@Entity()
export default class Company {
    @PrimaryColumn('varchar')
    name: string;

    @OneToMany(() => EnterpriseTutor, (tutor) => tutor.company)
    tutors: EnterpriseTutor[];
}
