import { DatabaseClient } from '.';
import { DatabaseConnection } from './interfaces/db-client.abstract';

export default abstract class DatabaseRepository {
    protected _db?: DatabaseConnection;

    public constructor() {
        const databaseClient = DatabaseClient.getInstance();
        this._db = databaseClient.getConnection();
    }
}
