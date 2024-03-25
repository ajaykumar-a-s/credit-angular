import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  adminname: any;
  username: any;
//username: any = this.loginService.getCustomer().name;
 //adminname:any=this.loginService.getAdmin().name;
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit() {
    const admin = this.loginService.getAdmin();
    if (admin) {
      this.adminname = admin.name;
    }

    const customer = this.loginService.getCustomer();
    if (customer) {
      this.username = customer.name;
    }
  }
  isLoggedIn = this.loginService.isLoggedIn();
  isCustomer = this.loginService.isCustomerLoggedIn();
  isAdmin = this.loginService.isAdminLoggedIn();
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
