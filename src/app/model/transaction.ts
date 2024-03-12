export interface Transaction {
  transactionId?: number;
  fromCardNumber: string;
  fromCardHolderName: string;
  expiryDate: string;
  cvv: number;
  toCardNumber: string;
  transactionName: string;
  description: string;
  amount: number;
}
