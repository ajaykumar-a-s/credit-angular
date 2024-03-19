import { TransactionResponse } from './transaction-response';

export interface BillResponse {
  billId?: number;
  transactions: TransactionResponse[];
  amount: number;
  billGeneratedDate: Date;
  dueDate: Date;
  paid: boolean;
  cardNumber: string;
}
