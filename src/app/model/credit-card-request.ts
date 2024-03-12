import { Customer } from "./customer";

export interface CreditCardRequest {
    creditCardRequestId?: number;
    status: string;
    customer : Customer;
}
