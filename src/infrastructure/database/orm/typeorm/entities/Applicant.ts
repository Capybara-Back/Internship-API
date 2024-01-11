import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: string;
}
