import RouterHandler from "../router.abstract";
import GetAllAcademicTutorsDeliverer from "@infra/web/delivery/academic-tutors/academic-tutors.delivrer";

export default class AcademicTutorRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.get('/', this.handleRequest(GetAllAcademicTutorsDeliverer));
    }
}