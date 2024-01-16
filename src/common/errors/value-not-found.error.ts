export default class ValueNotFoundError extends Error {
    public name: string;
    public code: number;

    public constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = 404;
    }
}
