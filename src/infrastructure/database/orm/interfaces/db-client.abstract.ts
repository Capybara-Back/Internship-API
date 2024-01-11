import { DataSource as TypeORM } from 'typeorm';

export type DatabaseConnection = TypeORM | null;

export interface IDatabaseClient {
    setDialect(dbDialect: string): void;

    connect(): Promise<void>;

    close(): Promise<null | void>;

    getDialect(): string;

    getConnection(): DatabaseConnection;
}

export default abstract class DatabaseClient implements IDatabaseClient {
    protected _dialect: string;
    protected _connection: DatabaseConnection;

    public constructor() {
        this._connection = null;
        this._dialect = '';
    }

    public setDialect(dbDialect: string): void {
        this._dialect = dbDialect;
    }

    public abstract connect(): Promise<void>;

    public abstract close(): Promise<null | void>;

    public getDialect(): string {
        return this._dialect;
    }

    public getConnection(): DatabaseConnection {
        return this._connection;
    }
}
