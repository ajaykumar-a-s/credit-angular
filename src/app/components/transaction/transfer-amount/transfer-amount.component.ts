import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionResponse } from '../../../model/transaction-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer-amount',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transfer-amount.component.html',
  styleUrl: './transfer-amount.component.css',
})
export class TransferAmountComponent implements OnInit {
  transactionForm!: FormGroup;
  transactionResult!: TransactionResponse;
  errroMessage!: string;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {}
  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      customerCreditCardNumber: [''],
      customerName: [''],
      validUpto: [''],
      cvv: [''],
      merchantCardNumber: [''],
      merchantName: [''],
      transactionName: [''],
      description: [''],
      amount: [''],
    });
  }
  onSubmit() {
    this.transactionService
      .transferAmount(this.transactionForm.value)
      .subscribe({
        next: (data) => {
          this.transactionResult = data;
        },
        error: (error) => {
          this.errroMessage = error;
        },
      });
  }
}
