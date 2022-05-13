export class Contact {
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    mailingAddress?: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        zip: string;
    }
    phone?: string;
    
    constructor(options?: {
        email?: string,
        firstName?: string,
        lastName?: string,
        mailingAddress?: {
            addressLine1: string;
            addressLine2?: string;
            city: string;
            state: string;
            zip: string;
        },
        phone?: string
    }) {
        this.id = '';
        this.email = options?.email || '';
        this.firstName = options?.firstName || '';
        this.lastName = options?.lastName || undefined;
        this.mailingAddress = options?.mailingAddress || undefined;
        this.phone = options?.phone || undefined;
    }
}

export class Login {
    email: string;
    password: string;
    
    constructor() {
        this.email = '';
        this.password = '';
    }
}

export class User {
    id?: string;
    password: string;
    artistNames: string[];
    bandConnections: { role: string, bandName: string }[];
    lessonsOwned: string[];
    productsOwned: string[];
    contactInfo: Contact;
    options: {key: string, value: string}[];

    constructor(options?: {
        password?: string,
        artistNames?: string[],
        bandConnections?: { role: string, bandName: string }[],
        lessonsOwned?: string[],
        productsOwned?: string[],
        contactInfo?: Contact
        options?: {key: string, value: string}[]
    }) {
        this.password = '';
        this.artistNames = options?.artistNames || [];
        this.bandConnections = options?.bandConnections || [];
        this.lessonsOwned = options?.lessonsOwned || [];
        this.productsOwned = options?.productsOwned || [];
        this.contactInfo = options?.contactInfo || new Contact();
        this.options = options?.options || [];
    }
}

export class UserInfo {
    userId: string = '';
    recentLessons: {courseId: string, lessonId: string}[] = [];
    emailPrivacy: number = -1;
}
export const StateAbbreviations = [
    'AK', 'AL', 'AR', 'AS', 'AZ', 'CA',
    'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'GU', 'HI', 'IA', 'ID', 'IL', 'IN',
    'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
    'MI', 'MN', 'MO', 'MP', 'MS', 'MT',
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM',
    'NV', 'NY', 'OH', 'OK', 'OR', 'PA',
    'PR', 'RI', 'SC', 'SD', 'TN', 'TX',
    'UM', 'UT', 'VA', 'VI', 'VT', 'WA',
    'WI', 'WV', 'WY'
]