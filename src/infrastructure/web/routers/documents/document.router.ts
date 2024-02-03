import upload from '@infra/web/middlewares/file-upload';
import { AddDocumentDeliverer } from '../../../web/delivery/documents';
import RouterHandler from '../router.abstract';

export default class DocumentRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.post(
            '/internships/:internshipId',
            upload.array('files', 10), // TODO Add on env vars
            this.handleRequest(AddDocumentDeliverer)
        );
    }
}
