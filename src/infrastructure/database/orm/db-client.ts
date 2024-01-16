import { SingletonWrapper } from '../../../common/helpers';
import TypeORMClient from './typeorm/client/typeorm.client';

const singletonDatabaseClient = SingletonWrapper.makeSingleton(
    new TypeORMClient()
);

export default singletonDatabaseClient;
