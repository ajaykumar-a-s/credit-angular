import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [RouterOutlet, HeaderComponent,RouterLink,RouterLinkActive,FormsModule]
})
export class CardComponent {
    constructor(private loginService: LoginService) {}
    isCustomer = this.loginService.isCustomerLoggedIn();
}
