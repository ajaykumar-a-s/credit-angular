import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit{
  customerForm !: FormGroup
  response !: string
  constructor(private fb : FormBuilder, private customerService : CustomerService, private router : Router){}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone : ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dateOfBirth : ['', [Validators.required]],
      annualIncome : ['', [Validators.required]]
    })
}
onSubmit(){
  console.log(this.customerForm.value);
  
  this.customerService.addCustomer(this.customerForm.value).subscribe({
    next: data => {
      console.log(data);
      this.response = 'Customer Added Successfully';
      this.router.navigate(['/login']);
    },
    error: error => {
      this.response = error;
    }
  });
}}
