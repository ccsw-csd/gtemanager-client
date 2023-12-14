import { DashboardSimpleData } from "./DashboardSimpleData";

export class DashboardData {

    clients: DashboardSimpleData[];
    persons: DashboardSimpleData[];

    public constructor(init?: Partial<DashboardData>) {
        Object.assign(this, init);
    }
}