export default class ValidationError extends Error {
    public name: string;
    public code: number;
    public reason?: any;
    public validationErrors?: any;

    public constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = 500;
    }
}
