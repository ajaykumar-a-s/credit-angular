export interface TransactionRequest {
  customerCreditCardNumber: string;
  customerName: string;
  validUpto: string;
  cvv: number;
  merchantCardNumber: string;
  merchantName: string;
  transactionName?: string;
  description?: string;
  amount: number;
}
