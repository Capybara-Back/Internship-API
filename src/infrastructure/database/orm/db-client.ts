import { SingletonWrapper } from '../../../common/helpers';
import DatabaseClientFactory from './db-client.factory';

const databaseClientFactory = new DatabaseClientFactory();

const databaseClient = databaseClientFactory.makeClient('POSTGRES');

const singletonDatabaseClient = SingletonWrapper.makeSingleton(databaseClient);

export default singletonDatabaseClient;
