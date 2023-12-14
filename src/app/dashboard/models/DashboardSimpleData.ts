export class DashboardSimpleData {

    name: String;
    weeks: number;
    hours: number;

    public constructor(init?: Partial<DashboardSimpleData>) {
        Object.assign(this, init);
    }
}