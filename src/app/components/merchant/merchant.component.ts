import { Component} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { MerchantService } from '../../services/merchant.service';

@Component({
    selector: 'app-merchant',
    standalone: true,
    templateUrl: './merchant.component.html',
    styleUrl: './merchant.component.css',
    imports: [RouterOutlet, RouterModule, HeaderComponent,CommonModule]
})
export class MerchantComponent{

}
