import { DataSource } from 'typeorm';
import AcademicTutor from './entities/AcademicTutor';
import Company from './entities/Company';
import CompanyTutor from './entities/CompanyTutor';
import Document from './entities/Document';
import Internship from './entities/Internship';
import Student from './entities/Student';
import User from './entities/User';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), process.env.ENV_FILE || '.env')
});

const postgresConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

export const dataSource = new DataSource({
    ...postgresConfig,
    type: 'postgres',
    logging: false,
    entities: [User, AcademicTutor, Company, CompanyTutor, Document, Internship, Student],
    synchronize: true
});
