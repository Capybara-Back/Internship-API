import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Internship from './Internship';

@Entity()
export default class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    path: string;

    @Column('integer')
    levelOfConfidentiality: number;

    @ManyToOne(() => Internship, (internship) => internship.documents)
    internship: Internship;
}
