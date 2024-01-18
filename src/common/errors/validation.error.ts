export default class ValidationError extends Error {
    public name: string;
    public code: number;
    public reason?: any;
    public validationErrors?: any;

    public constructor(message: string, validationErrors: any = undefined) {
        super(message);
        this.name = this.constructor.name;
        this.reason = message;
        this.code = 400;
        this.validationErrors = validationErrors;
    }
}
