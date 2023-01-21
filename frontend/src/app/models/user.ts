export class User {
    _id: string;
    firstName: string;
    lastName: string;
    tz: string;
    city: string;
    street: string;
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
    role: Role = Role.USER;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}