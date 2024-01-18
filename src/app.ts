import 'module-alias/register';
import path from 'path';
import WebAppFactory from './infrastructure/web-app.factory';
import dotenv from 'dotenv';
import logger from '@common/logger';

dotenv.config({
    path: path.resolve(process.cwd(), process.env.ENV_FILE || '.env')
});

const expressApp = new WebAppFactory().getExpressApp().build();

const port: number = parseInt(process.env.PORT || '9000');
expressApp.listen(port, () => logger.info(`> Running on port ${port} ...`));
