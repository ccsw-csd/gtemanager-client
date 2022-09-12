import { PersonSaga } from "./PersonSaga";
import { Center } from "./Center";

export class Person {
    id: number;
    saga: String;
    username: string;
    email: string;
    name: string;
    lastName: string;
    center: Center;
    businessCode: string;
    grade: string;
    active: boolean;
    
    public constructor(init?:Partial<Person>) {
        Object.assign(this, init);
    }
}