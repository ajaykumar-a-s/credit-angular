import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionResponse } from '../../../model/transaction-response';

@Component({
  selector: 'app-view-transactions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css',
})
export class ViewTransactionsComponent implements OnInit {
  searchForm!: FormGroup;
  transactions: TransactionResponse[] = [];
  errorMessage!: string;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      transactionId: [''],
      customerCreditCardNumber: [''],
      startDate: [''],
      endDate: [''],
    });
  }
  onSubmit() {
    this.transactions = [];
    if (this.searchForm.get('transactionId')?.value) {
      this.transactionService
        .getTransactionById(this.searchForm.get('transactionId')?.value)
        .subscribe({
          next: (data) => {
            this.transactions = [data];
          },
          error: (error) => {
            this.errorMessage = error;
          },
        });
    } else if (this.searchForm.get('customerCreditCardNumber')?.value) {
      if (
        this.searchForm.get('startDate')?.value &&
        this.searchForm.get('endDate')?.value
      ) {
        this.transactionService
          .getTransactionsByCustomerCreditCardNumberForParticularDuration(
            this.searchForm.get('customerCreditCardNumber')?.value,
            this.searchForm.get('startDate')?.value,
            this.searchForm.get('endDate')?.value
          )
          .subscribe({
            next: (data) => {
              this.transactions = data;
            },
            error: (error) => {
              this.errorMessage = error;
              console.log(this.transactions);
              console.log(this.errorMessage);
            },
          });
      } else {
        this.transactionService
          .getTransactionsByCustomerCreditCardNumber(
            this.searchForm.get('customerCreditCardNumber')?.value
          )
          .subscribe({
            next: (data) => {
              this.transactions = data;
            },
            error: (error) => {
              this.errorMessage = error;
            },
          });
      }
    } else {
      this.transactionService.getAllTransactions().subscribe({
        next: (data) => {
          this.transactions = data;
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
    }
  }
}
