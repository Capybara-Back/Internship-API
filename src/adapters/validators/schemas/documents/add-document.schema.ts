import { z } from 'zod';

const schema = z
    .object({
        title: z.string()
    })
    .refine(
        (schema: any) =>
            Date.parse(schema.startDate) < Date.parse(schema.endDate),
        {
            message: 'Start date must be earlier than End date.'
        }
    )
    .superRefine((schema: any, ctx) => {
        const hasCompanyId = Boolean(schema.companyId);

        return true;
    });

export default schema;
