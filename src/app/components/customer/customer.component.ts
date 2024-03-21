import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  customers !: any;
  errorMessage !: string;
  constructor(private customerService: CustomerService, private loginService : LoginService, private router : Router) {}
  ngOnInit(): void {
    if (this.loginService.isAdminLoggedIn()) {
      this.customerService.getAllCustomers().subscribe({
        next: (customers) => {
          this.customers = customers;
        },
        error: (error) => {
          this.errorMessage = error;
        }
      })
    }else{
      this.customerService.getCustomerById(this.loginService.getCustomer().customerId).subscribe({
        next: (customer) => {
          this.customers = [customer];
        },
        error: (error) => {
          this.errorMessage = error;
        }
      })
    }
  }
  deleteCustomer(customerId: number){
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customers = this.customers.filter((customer: { customerId: number; }) => customer.customerId !== customerId);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    })
  }
  updateCustomer(id : number){
    this.customerService.setCurrentCustomer(this.customers[id]);
    this.router.navigate(['/update-customer'])
  }
}
