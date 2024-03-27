import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionResponse } from '../../../model/transaction-response';
import { LoginService } from '../../../services/login.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-view-transactions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTooltipModule],
  templateUrl: './view-transactions.component.html',
  styleUrl: './view-transactions.component.css',
})
export class ViewTransactionsComponent implements OnInit {
  searchForm!: FormGroup;
  transactions: TransactionResponse[] = [];
  errorMessage!: string;
  isAdmin = this.loginService.isAdminLoggedIn();
  isCustomer = this.loginService.isCustomerLoggedIn();
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    const customer = localStorage.getItem('customer');
    const customerCreditCardNumber = customer
      ? JSON.parse(customer).creditCard.cardNumber
      : '';
    this.searchForm = this.fb.group({
      transactionId: [''],
      customerCreditCardNumber: [
        customerCreditCardNumber,
        Validators.pattern('^[0-9]{16}$'),
      ],
      startDate: [{ value: '', disabled: customerCreditCardNumber === '' }],
      endDate: [{ value: '', disabled: customerCreditCardNumber === '' }],
    });

    this.searchForm.controls['transactionId'].valueChanges.subscribe(
      (value) => {
        if (value) {
          this.searchForm.controls['customerCreditCardNumber'].disable();
          this.searchForm.controls['startDate'].disable();
          this.searchForm.controls['endDate'].disable();
        } else {
          this.searchForm.controls['customerCreditCardNumber'].enable();
        }
      }
    );
    this.searchForm.controls['customerCreditCardNumber'].valueChanges.subscribe(
      (value) => {
        if (value) {
          this.searchForm.controls['transactionId'].disable();
          if (this.searchForm.controls['customerCreditCardNumber'].valid) {
            this.searchForm.controls['startDate'].enable();
            this.searchForm.controls['endDate'].enable();
          }
        } else {
          this.searchForm.controls['transactionId'].enable();
          this.searchForm.controls['startDate'].disable();
          this.searchForm.controls['endDate'].disable();
          this.searchForm.controls['startDate'].reset();
          this.searchForm.controls['endDate'].reset();
        }
      }
    );
    this.searchForm.controls['startDate'].valueChanges.subscribe((value) => {
      if (value) {
        this.searchForm.controls['endDate'].setValidators([
          Validators.required,
        ]);
        this.searchForm.controls['endDate'].updateValueAndValidity({
          emitEvent: false,
        });
      } else {
        this.searchForm.controls['endDate'].clearValidators();
        this.searchForm.controls['endDate'].updateValueAndValidity({
          emitEvent: false,
        });
      }
    });
    this.searchForm.controls['endDate'].valueChanges.subscribe((value) => {
      if (value) {
        this.searchForm.controls['startDate'].setValidators([
          Validators.required,
        ]);
        this.searchForm.controls['startDate'].updateValueAndValidity({
          emitEvent: false,
        });
      } else {
        this.searchForm.controls['startDate'].clearValidators();
        this.searchForm.controls['startDate'].updateValueAndValidity({
          emitEvent: false,
        });
      }
    });
    if (this.isAdmin) {
      this.transactionService.getAllTransactions().subscribe({
        next: (data) => {
          this.transactions = data;
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
    } else if (this.isCustomer) {
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
  }
  onSubmit() {
    console.log(this.searchForm.controls['customerCreditCardNumber'].value);
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
