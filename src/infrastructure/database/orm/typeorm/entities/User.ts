import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
    User,
    Admin
}

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 30 })
    firstName: string;

    @Column('varchar', { length: 30 })
    lastName: string;

    @Column('varchar', { length: 60, unique: true })
    email: string;

    @Column('varchar')
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        nullable: true,
        default: UserRole.User
    })
    role: UserRole;
}
