import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-bill',
    standalone: true,
    templateUrl: './bill.component.html',
    styleUrl: './bill.component.css',
    imports: [RouterOutlet, HeaderComponent]
})
export class BillComponent {

}
