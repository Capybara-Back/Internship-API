import { ZodValidator } from '../zod-validator';

import addInternshipSchema from '../schemas/internships/add-internship.schema';

export const addInternshipValidator = new ZodValidator(addInternshipSchema);
