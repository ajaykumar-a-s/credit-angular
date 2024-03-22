import { Component } from '@angular/core';
import { MerchantService } from '../../../services/merchant.service';
import { Merchant } from '../../../model/merchant';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-update-merchant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './update-merchant.component.html',
  styleUrl: './update-merchant.component.css'
})
export class UpdateMerchantComponent {

  merchant: Merchant = {
    name: '',
    cardNumber: ''
  };

  //merchants !: Merchant[];
  constructor(private merchantService: MerchantService) { }
  // updateMerchant() {
  //   this.merchantService.updateMerchant(this.merchant).subscribe(
  //     {
  //       next:(data) => {
  //         console.log(data);
  //       },
  //       error:(err)=>{
  //         console.log(err);
  //       }
  //     }
  //   )

  updateMerchant(merchant: any) {
    this.merchantService.updateMerchant(merchant).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (err) => {
        console.log(err);

      }

    })

}
}
