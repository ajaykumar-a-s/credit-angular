import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-transaction',
    standalone: true,
    templateUrl: './transaction.component.html',
    styleUrl: './transaction.component.css',
    imports: [RouterOutlet, HeaderComponent]
})
export class TransactionComponent {

}
