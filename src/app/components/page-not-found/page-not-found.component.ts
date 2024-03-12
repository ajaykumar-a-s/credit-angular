import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.css',
    imports: [HeaderComponent]
})
export class PageNotFoundComponent {

}
