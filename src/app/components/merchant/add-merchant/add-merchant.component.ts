import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Merchant } from '../../../model/merchant';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from '../merchant.component';
import { MerchantService } from '../../../services/merchant.service';

@Component({
  selector: 'app-add-merchant',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.css'
})
export class AddMerchantComponent implements OnInit {
  merchantForm!:FormGroup;
  response:any;
  constructor(private merchantService:MerchantService,
    private fb : FormBuilder 
    ){}
    ngOnInit(): void {
      this.merchantForm = this.fb.group({
        name : ['', Validators.required],
        cardNumber:['',Validators.required]
      })
    }
    addMerchant(){
      
      this.merchantService.addMerchant(this.merchantForm.value).subscribe(
        
          { next: (response) => { 
            this.response ="Succesfully Added...!"; 
         console.log(response);
         this.merchantForm.reset();
          },
          error: (error) => { 
            this.response = error; 
            console.log(error);
           
          }
        });
        
      }
    }

