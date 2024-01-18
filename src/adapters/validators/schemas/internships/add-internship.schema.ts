import { z } from 'zod';

const CompanySchema = z
    .object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        zipCode: z.string()
    })
    .optional();

const TutorSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
        mailAddress: z.string().email()
    })
    .optional();

const schema = z
    .object({
        title: z.string(),
        missionDescription: z.string(),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        companyId: z.string().uuid().optional(),
        company: CompanySchema,
        studentId: z.string().uuid(),
        academicTutorId: z.string().uuid().optional(),
        academicTutor: TutorSchema,
        companyTutorId: z.string().uuid().optional(),
        companyTutor: TutorSchema.optional()
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
        const hasCompany = Boolean(schema.company);
        const hasAcademicTutorId = Boolean(schema.academicTutorId);
        const hasAcademicTutor = Boolean(schema.academicTutor);
        const hasCompanyTutorId = Boolean(schema.companyTutorId);
        const hasCompanyTutor = Boolean(schema.companyTutor);

        if ((hasCompanyId && hasCompany) || (!hasCompanyId && !hasCompany)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "You cannot give 'company' and 'companyId' at the same time!"
            });
        }

        if (
            (hasAcademicTutorId && hasAcademicTutor) ||
            (!hasAcademicTutorId && !hasAcademicTutor)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "You cannot give 'academicTutor' and 'academicTutorId' at the same time!"
            });
        }

        if (
            (hasCompanyTutorId && hasCompanyTutor) ||
            (!hasCompanyTutorId && !hasCompanyTutor)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "You cannot give 'companyTutor' and 'companyTutorId' at the same time!"
            });
        }

        return true;
    });

export default schema;
