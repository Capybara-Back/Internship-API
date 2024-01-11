import { JoiValidator } from '../joi-validator';

import { GetApplicantSchema } from '../schemas/applicants';

export const getApplicantvalidator = new JoiValidator(GetApplicantSchema);
