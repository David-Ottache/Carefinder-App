export class User {
    id: number | undefined;
    username: string = "";
    email: string = "";
    address: string = "";
    number: number = 0;
    password: string = "";
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.username) this.username = initializer.username;
        if (initializer.email) this.email = initializer.email;
        if (initializer.address) this.address = initializer.address;
        if (initializer.number) this.number = initializer.number;
        if (initializer.password) this.password = initializer.password;
    }
}