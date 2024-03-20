import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Merchant } from '../../../model/merchant';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from '../merchant.component';
import { MerchantService } from '../../../services/merchant.service';

@Component({
  selector: 'app-add-merchant',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.css'
})
export class AddMerchantComponent {
  //const merchantInstance: Merchant = new Merchant();
  merchant:Merchant= new Merchant();
  constructor(private merchantService:MerchantService){}
    addMerchant(){
      
      this.merchantService.addMerchant(this.merchant).subscribe(
        {
          next:(data) => {
            console.log(data);
          },
          error:(err)=>{
            console.log(err);
          }
        }
      )
    }

}

