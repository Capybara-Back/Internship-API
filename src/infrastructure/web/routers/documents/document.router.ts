import { AddDocumentDeliverer } from '../../../web/delivery/documents';
import RouterHandler from '../router.abstract';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export default class DocumentRouter extends RouterHandler {
    public constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.post(
            '/',
            upload.single('file'),
            this.handleRequest(AddDocumentDeliverer)
        );
    }
}
