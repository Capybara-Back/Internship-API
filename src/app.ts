import path from 'path';
import WebAppFactory from './infrastructure/web-app.factory';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(process.cwd(), process.env.ENV_FILE || '.env')
});

const expressApp = new WebAppFactory().getExpressApp().build();

const port: number = parseInt(process.env.PORT || '9000');
expressApp.listen(port, () =>
    console.log(`\n> App is running on port ${port}`)
);
