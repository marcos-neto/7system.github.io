export interface ICredentials {
    email: string;
    grantType: string;
    password?: string;
    refreshToken?: string;
    socialId?: string;
}

export interface IToken {
    token: string;
    type: string;
    expiration: Date;
    refreshToken: string;
}

export interface IRegister {
    fullName: string;
    email: string;
    password: string;
    socialId?: string;
    provider?: string;
}

export interface IResetPassword {
    token: string;
    newPassword: string;
}