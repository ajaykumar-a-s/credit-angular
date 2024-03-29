import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, MatTooltipModule],
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
      email: ['', Validators.email],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
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
