const isEntity = (v: any): boolean => {
    return v instanceof Entity;
};

export default abstract class Entity<T> {
    protected _id?: string;
    protected props: T;

    public constructor(props: T, id?: string | null) {
        if (id) {
            this._id = id;
        }
        this.props = props;
    }

    get id(): string | undefined {
        return this._id;
    }

    public equals(obj: { [key: string]: any }): boolean {
        if (obj == null) {
            return false;
        }

        if (!isEntity(obj)) {
            return false;
        }

        return this.id === obj.id;
    }

    public toJSON() {
        return {
            id: this.id,
            ...this.props
        };
    }

    public getProps(): T {
        return this.props;
    }

    public setProps(props: T): void {
        this.props = props;
    }
}
