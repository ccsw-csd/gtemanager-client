export class User{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
      }
}

