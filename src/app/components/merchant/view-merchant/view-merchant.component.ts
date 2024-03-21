import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../../../services/merchant.service';
import { Merchant } from '../../../model/merchant';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-merchant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-merchant.component.html',
  styleUrl: './view-merchant.component.css'
})
export class ViewMerchantComponent implements OnInit{
  merchants !: Merchant[];
  constructor(private merchantService: MerchantService) {}
  ngOnInit(): void {
    this.merchantService.getAllMerchants().subscribe({
      next: (data) => {
        this.merchants = data; // Assign the fetched merchants to the merchants array
        console.log(this.merchants);
      },
      error: (err) => {
        console.error('Error fetching merchants:', err);
      }
    });
  }
  deleteMerchant(merchant:any)
  {
this.merchantService.deleteMerchant(merchant.merchantId).subscribe({
  next:(data)=>{
    console.log(data);
    this.ngOnInit();
    alert("Merchant  deleted successfully");

  },
  error:(err)=>{
    console.log(err);
    
  }
})
  }
}
