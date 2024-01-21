import { ZodValidator } from '../zod-validator';

import addDocumentSchema from '../schemas/internships/add-document.schema';

export const addDocumentValidator = new ZodValidator(addDocumentSchema);
