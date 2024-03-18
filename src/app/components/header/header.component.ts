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
export class HeaderComponent{
  constructor(private loginService: LoginService, private router: Router) {}
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
