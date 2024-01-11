type RepositoryByDialect<T> = Record<string, () => T>;

export default abstract class RepositoryFactory<T> {
    public constructor() {}

    public abstract create(dbDialect: string): T;

    protected selectRepository(
        repositoryByDialect: RepositoryByDialect<T>,
        dbDialect: string
    ): () => T {
        if (dbDialect in repositoryByDialect) {
            const repository = repositoryByDialect[dbDialect];
            return repository;
        }

        return repositoryByDialect['IN_MEMORY'];
    }
}
