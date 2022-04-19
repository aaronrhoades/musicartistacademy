export class Subscriber {
    email?: string;
    firstName: string;
    lastName: string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
    }
}

export class Login extends Subscriber {
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