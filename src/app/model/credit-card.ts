import { CreditCardType } from "./credit-card-type";

export interface CreditCard {
    creditCardId?: number;
    cardNumber: string;
    validUpto: Date;
    cvv: number;
    currentLimit: number;
    creditCardType : CreditCardType;
    
}
