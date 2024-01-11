import DatabaseClient from '../../interfaces/db-client.abstract';
import { AppDataSource } from '../typeorm';

export default class TypeORMClient extends DatabaseClient {
    public constructor() {
        super();
        Object.seal(this);
    }

    public async connect(): Promise<void> {
        try {
            await AppDataSource.initialize();

            this._connection = AppDataSource;
        } catch (err) {
            this._connection = null;
            //   logger.error({ err }, 'Unable to synchronize with database');
        }
    }

    public async close(): Promise<null | void> {
        //   if (!this._connection) return null;
        //   logger.info('Database connection: Successfully closed');
    }
}
