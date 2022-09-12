export class Center {
    id: number;
    name: string;

    public constructor(init?:Partial<Center>) {
        Object.assign(this, init);
    }
}