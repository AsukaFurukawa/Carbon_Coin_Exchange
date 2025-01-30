export interface IUser {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    walletAddress: string;
    createdAt: number;
    carbonCoins: number;
}

export interface IUserRegistration {
    email: string;
    password: string;
    name: string;
}

export interface IUserLogin {
    email: string;
    password: string;
} 