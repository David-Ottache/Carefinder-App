export class Hospital {
    id: number | undefined;
    name: string = '';
    address: string = '';
    city: string = '';
    country: string = '';
    email: string = '';
    number: string = '';
    link: string = '';
    imgUrl: string = '';
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;
        if (initializer.address) this.address = initializer.address;
        if (initializer.city) this.city = initializer.city;
        if (initializer.country) this.country = initializer.country;
        if (initializer.email) this.email = initializer.email;
        if (initializer.number) this.number = initializer.number;
        if (initializer.link) this.link = initializer.link;
        if (initializer.imageUrl) this.imgUrl = initializer.imageUrl;
    }
}