import { z } from 'zod';

const schema = z
    .object({
        documentName: z.string(),
        levelOfConfidentiality: z.number(),
        internshipId: z.string().uuid()
    })
    .refine((schema: any) => schema.levelOfConfidentiality < 0, {
        message: 'Level of confidentiality should be positive.'
    })
    .superRefine((schema: any, ctx) => {
        return true;
    });

export default schema;
