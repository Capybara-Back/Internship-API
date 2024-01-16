import logger from '../../../../../common/logger';
import DatabaseClient from '../../interfaces/db-client.abstract';
import { dataSource } from '../typeorm';

export default class TypeORMClient extends DatabaseClient {
    public constructor() {
        super();
        Object.seal(this);
    }

    public async connect(): Promise<void> {
        try {
            await dataSource.initialize();
            this._connection = dataSource;
        } catch (err) {
            this._connection = null;
            logger.error({ err }, 'Unable to connect with database');
        }
    }

    public async close(): Promise<null | void> {
        if (!this._connection) return null;
        await this._connection?.destroy();
        logger.info('Database connection: Successfully closed');
    }
}
