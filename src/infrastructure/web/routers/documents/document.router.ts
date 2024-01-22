import { AddDocumentDeliverer } from '../../../web/delivery/documents';
import RouterHandler from '../router.abstract';

export default class DocumentRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.post('/', this.handleRequest(AddDocumentDeliverer));
    }
}
