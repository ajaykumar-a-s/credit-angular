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
import { MerchantService } from '../../../services/merchant.service';
import { Merchant } from '../../../model/merchant';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-transfer-amount',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTooltipModule],
  templateUrl: './transfer-amount.component.html',
  styleUrl: './transfer-amount.component.css',
})
export class TransferAmountComponent implements OnInit {
  transactionForm!: FormGroup;
  transactionResult!: TransactionResponse;
  errorMessage!: string;
  merchants: Merchant[] = [];
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private merchantService: MerchantService
  ) {}
  ngOnInit(): void {
    this.merchantService.getAllMerchants().subscribe({
      next: (data) => {
        this.merchants = data;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
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
  onMerchantChange(event: Event) {
    const selectedName = (event.target as HTMLSelectElement).value;
    const selectedMerchant = this.merchants.find(
      (merchant) => merchant.name === selectedName
    );
    if (selectedMerchant) {
      this.transactionForm
        .get('merchantCardNumber')
        ?.setValue(selectedMerchant.cardNumber, { emitEvent: false });
    }
  }

  onCardNumberChange(event: Event) {
    const selectedCardNumber = (event.target as HTMLSelectElement).value;
    const selectedMerchant = this.merchants.find(
      (merchant) => merchant.cardNumber === selectedCardNumber
    );
    if (selectedMerchant) {
      this.transactionForm
        .get('merchantName')
        ?.setValue(selectedMerchant.name, { emitEvent: false });
    }
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
