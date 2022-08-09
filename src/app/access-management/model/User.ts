export class User{
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
      }
}

