export interface ICredentials {
    email: string;
    password: string;
    grantType: string;
    refreshToken?: string;
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
    birthDate: Date;
    cellPhone: string;
    clubId: number;
}