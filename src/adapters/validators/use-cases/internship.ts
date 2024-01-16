import { JoiValidator } from '../joi-validator';

import addInternshipSchema from '../schemas/internships/add-internship.schema';

export const addInternshipValidator = new JoiValidator(addInternshipSchema);
