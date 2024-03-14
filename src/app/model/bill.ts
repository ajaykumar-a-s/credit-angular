import { TransactionResponse } from './transaction-response';

export interface Bill {
  billId?: number;
  transactions: TransactionResponse[];
  amount: number;
  billGeneratedDate: Date;
  dueDate: Date;
  isPaid: boolean;
  cardNumber: string;
}
