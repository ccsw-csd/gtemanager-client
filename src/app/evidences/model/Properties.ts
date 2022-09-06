export class Properties {
    id: number;
    key: string;
    value: string;

    public constructor(init?:Partial<Properties>) {
        Object.assign(this, init);
    }
}