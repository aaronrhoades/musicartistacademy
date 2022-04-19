export class Contact {
    email: string;
    firstName: string;
    lastName?: string;
    address?: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        zip: string;
    }  
    phone?: string;
    
    constructor() {
        this.email = '';
        this.firstName = '';
    }
}

export class Login extends Contact {
    username?: string;
    password: string;
    
    constructor() {
        super();
        this.password = '';
    }
}

export class User extends Login {
    artistNames: string[];
    bandConnections: { role: string, bandName: string }[];
    lessonsOwned: string[];
    productsOwned: string[];

    constructor() {
        super();
        this.artistNames = [];
        this.bandConnections = [];
        this.lessonsOwned = [];
        this.productsOwned = [];
    }
}