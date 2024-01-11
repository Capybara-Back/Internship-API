import ExpressApp from './web/express-app';
import MainRouter from './web/routers';

class WebAppFactory {
    public constructor() {}

    public getExpressApp(): ExpressApp {
        return new ExpressApp(new MainRouter());
    }
}

export default WebAppFactory;
