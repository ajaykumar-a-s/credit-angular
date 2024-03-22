import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent {
  updateCustomerForm !: FormGroup
  response !: string
  currentCustomer = this.customerService.getCurrentCustomer();
  constructor(private fb : FormBuilder, private customerService : CustomerService, private router : Router){}
  ngOnInit(): void {
    this.updateCustomerForm = this.fb.group({
      customerId : [this.currentCustomer.customerId, Validators.required],
      name: [this.currentCustomer.name, [Validators.required]],
      email: [this.currentCustomer.email, [Validators.required, Validators.email]],
      phone : [this.currentCustomer.phone, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [this.currentCustomer.password, [Validators.required]],
      address: [this.currentCustomer.address, [Validators.required]],
      dateOfBirth : [this.currentCustomer.dateOfBirth, [Validators.required]],
      annualIncome : [this.currentCustomer.annualIncome, [Validators.required]]
    })
}
onSubmit(){
  this.customerService.updateCustomer(this.updateCustomerForm.value).subscribe({
    next: data => {
      this.response = "Updated Successfully!"
      this.router.navigate(['/customer'])
    },
    error: error => {
      this.response = error
    }
  })
}
}
