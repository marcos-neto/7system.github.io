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
    erro: boolean;
}

export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    class?: string;
    collapse?: string;
    children?: ChildrenItem[]
}

export interface ChildrenItem {
    path: string;
    title: string;
    type?: string;
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

export interface ISchedule {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    allDay: boolean;
    type: number;
    clubId?: number;
}

export interface IProvider {
    id: number;
    name: string;
}