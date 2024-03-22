import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../../../services/merchant.service';
import { Merchant } from '../../../model/merchant';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-merchant',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './update-merchant.component.html',
  styleUrl: './update-merchant.component.css'
})
export class UpdateMerchantComponent implements OnInit{
  merchantForm!:FormGroup;
  errorMessage!:string;
  currentMerchant = this.merchantService.getMerchant();
response: any;
 ngOnInit(): void {
    this.merchantForm = this.fb.group({
      merchantId :[this.currentMerchant?.merchantId],
      name : [this.currentMerchant?.name,Validators.required],
      cardNumber : [this.currentMerchant?.cardNumber,[Validators.required,Validators.pattern('^[0-9]{16}$')]]
    })
 }
  constructor(private merchantService: MerchantService,private router:Router, private route : ActivatedRoute,
    private fb : FormBuilder) { }
  updateMerchant() {
    this.merchantService.updateMerchant(this.merchantForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['../view'], { relativeTo: this.route });

      },
      error: (err) => {
        this.errorMessage=err;
        console.log(err);
       

      }

    })

}
}
