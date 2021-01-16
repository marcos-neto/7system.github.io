export interface IUser {
    id: number;
    fullName: string;
    roleName: string;
    email: string;
    details?: IUserDetails;
    image?: string;
}

export interface ISimplifiedUser {
    email: string;
    fullName: string;
    id: number;
    isActive: boolean;
    roleName: string;
}

export interface IUserDetails {
    birthDate: string;
    cellphone: string;
    email: string;
    clubName: string;
    aboutMe: string;
    address?: IAddress;
}

export interface IAddress {
    street: string;
    complement: string;
    number: string;
    city: string;
    district: string;
    UF: string;
    zipCode: number;
}

export interface IViaCep {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
}

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isVisible: boolean;
}

export interface IRanking {
    userId: number;
    position: number;
    username: string;
    income: number;
    avatar: string;
}

export interface IUserBank {
    userId: number;
    name: string;
    unity: string;
    role: string;
    amount: number;
}

export interface ITransaction {
    amount: number;
    reason: string;
    users: number[];
}

export interface IClub {
    id: number;
    name: string;
    responsible: string;
    district: string;
}

export interface ISimplifiedClub {
    id: number,
    name: string
}