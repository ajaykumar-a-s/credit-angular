import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
  imports: [RouterModule, HeaderComponent, CommonModule],
})
export class TransactionComponent {
  constructor(private loginService: LoginService) {}
  isCustomer = this.loginService.isCustomerLoggedIn();
}
