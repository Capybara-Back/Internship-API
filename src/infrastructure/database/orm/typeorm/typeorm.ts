import { DataSource } from 'typeorm';
import AcademicTutor from './entities/AcademicTutor';
import Company from './entities/Company';
import CompanyTutor from './entities/CompanyTutor';
import Internship from './entities/Internship';
import Student from './entities/Student';
import User from './entities/User';

const postgresConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'capybara',
    password: 'capybara',
    database: process.env.DB_NAME
};

export const dataSource = new DataSource({
    ...postgresConfig,
    type: 'postgres',
    logging: false,
    entities: [User, AcademicTutor, Company, CompanyTutor, Internship, Student],
    synchronize: true
});
