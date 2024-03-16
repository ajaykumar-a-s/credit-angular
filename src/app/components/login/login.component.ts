import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    if (this.loginService.isCustomerLoggedIn()) {
      this.router.navigate(['/customer']);
    }
    if (this.loginService.isAdminLoggedIn()) { 
      this.router.navigate(['card/view-requests']);
    }
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  onCustomerLogin() {
    this.loginService.customerLogin(this.loginForm.value).subscribe({
      next: (value) => {
        localStorage.setItem('customer', JSON.stringify(value));
        this.router.navigate(['/customer']);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
  onAdminLogin() {
    this.loginService.adminLogin(this.loginForm.value).subscribe({
      next: (value) => {
        localStorage.setItem('admin', JSON.stringify(value));
        this.router.navigate(['/card/view-requests']);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
