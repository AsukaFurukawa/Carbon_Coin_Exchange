export interface ILoginForm {
    email: string;
    password: string;
}

export interface IRegisterForm extends ILoginForm {
    name: string;
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    walletAddress: string;
    carbonCoins: number;
}

export interface IAuthResponse {
    token: string;
    user: IUser;
} 