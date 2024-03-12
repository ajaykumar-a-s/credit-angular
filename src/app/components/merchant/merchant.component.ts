import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-merchant',
    standalone: true,
    templateUrl: './merchant.component.html',
    styleUrl: './merchant.component.css',
    imports: [RouterOutlet, HeaderComponent]
})
export class MerchantComponent {

}
