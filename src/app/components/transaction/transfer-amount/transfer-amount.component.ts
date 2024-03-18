import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  errorMessage!: string;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {}
  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      customerCreditCardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      customerName: ['', Validators.required],
      validUpto: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2})$'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      merchantCardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      merchantName: ['', Validators.required],
      transactionName: [''],
      description: [''],
      amount: ['', [Validators.required, Validators.min(1)]],
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

          this.errorMessage = error;
        },
      });
  }
}
