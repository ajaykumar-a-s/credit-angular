export interface Merchant {
    merchantId?: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    dateOfBirth: Date;
    balance?: number;
    cardNumber : string;
}
