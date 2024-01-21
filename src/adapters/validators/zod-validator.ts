import { Result } from '../../core/lib/result';
import IValidator from '../controllers/interfaces/i-validator';
import { ValidationError } from '../../common/errors';
import { AnyZodObject } from 'zod';

export class ZodValidator implements IValidator {
    private schema: AnyZodObject;

    public constructor(schema: any) {
        this.schema = schema;
    }

    public async validate<T>(payload: Record<string, any>): Promise<Result<T>> {
        const result = this.schema.safeParse(payload);
        if (result.success) {
            return Result.ok<T>(result.data as T);
        } else {
            const validationErrorMessages: Record<string, string[]> = {};
            result.error.issues.forEach((error: any) => {
                const propertyName = error.path[0];
                validationErrorMessages[propertyName] = error.message;
            });
            const errorMessage = 'Check your payload!';

            return Result.fail(
                new ValidationError(
                    errorMessage.replace(/"/g, "'"),
                    validationErrorMessages
                )
            );
        }
    }
}
