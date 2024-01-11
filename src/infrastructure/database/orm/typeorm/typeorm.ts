import { DataSource } from 'typeorm';
import { Applicant } from './entities';

const postgresConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'myusername',
    password: 'mypassword',
    database: process.env.DB_NAME
};

export const AppDataSource = new DataSource({
    ...postgresConfig,
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: [Applicant],
    migrations: ['src/migrations/**/*{.ts}'],
    subscribers: ['src/subscribers/**/*{.ts}']
});
