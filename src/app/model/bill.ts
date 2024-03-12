import { Transaction } from './transaction';

export interface Bill {
  billId?: number;
  transactions: Transaction[];
  amount: number;
  billGeneratedDate: Date;
  dueDate: Date;
  isPaid: boolean;
  cardNumber: string;
}
