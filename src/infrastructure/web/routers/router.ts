// import InternshipRouter from './internships/internship.router';
import CompanyTutorRouter from './company-tutors/conpany-tutors.router';
import DocumentRouter from './documents/document.router';
import InternshipRouter from './internships/internship.router';
import RouterHandler from './router.abstract';

export default class MainRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.use('/internships', new InternshipRouter().getRouter());
        this._router.use('/documents', new DocumentRouter().getRouter());
        this._router.use(
            '/company-tutors',
            new CompanyTutorRouter().getRouter()
        );
    }
}
