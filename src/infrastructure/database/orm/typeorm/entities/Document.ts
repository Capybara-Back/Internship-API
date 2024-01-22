import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Internship from './Internship';

@Entity()
export default class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    documentName: string;

    @Column('varchar')
    documentPath: string;

    @Column('number')
    levelOfConfidentiality: number;

    @Column('varchar')
    internship_id: string;

    @ManyToOne(() => Internship, (internship) => internship.documents)
    internship: Internship;
}
