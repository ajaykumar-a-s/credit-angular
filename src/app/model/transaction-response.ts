export interface TransactionResponse {
  transactionId: number;
  transactionName: string;
  description: string;
  amount: number;
  date: Date;
  transactionType: string;
  customerCreditCardNumber: string;
  merchantCardNumber: string;
}
