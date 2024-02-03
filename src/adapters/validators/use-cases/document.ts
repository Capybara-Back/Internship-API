import { ZodValidator } from '../zod-validator';

import addDocumentSchema from '../schemas/documents/add-document.schema';

export const addDocumentValidator = new ZodValidator(addDocumentSchema);
