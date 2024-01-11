import DatabaseClient from './interfaces/db-client.abstract';
import TypeORMClient from './typeorm/client/typeorm.client';

export default class DatabaseClientFactory {
    public constructor() {}

    public makeClient(dbDialect: string): DatabaseClient {
        const databaseClientMaker = this.selectDatabaseClientMaker(dbDialect);
        const databaseClient = databaseClientMaker();
        databaseClient.setDialect(dbDialect);
        return databaseClient;
    }

    private selectDatabaseClientMaker(dbDialect: string): () => DatabaseClient {
        const dialects = { IN_MEMORY: 'IN_MEMORY', POSTGRES: 'POSTGRES' };

        const databaseClientByDialect = {
            [dialects.POSTGRES]: () => new TypeORMClient()
            // [dialects.IN_MEMORY]: () => new InMemoryClient()
        };

        if (dbDialect in databaseClientByDialect) {
            const databaseClientMaker = databaseClientByDialect[dbDialect];
            return databaseClientMaker;
        }

        return databaseClientByDialect[dialects.IN_MEMORY];
    }
}
