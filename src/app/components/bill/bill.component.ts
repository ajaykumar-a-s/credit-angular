import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { LoginService } from '../../services/login.service';
import { BillResponse } from '../../model/bill';
import { BillService } from '../../services/bill.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bill',
    standalone: true,
    templateUrl: './bill.component.html',
    styleUrl: './bill.component.css',
    imports: [RouterOutlet, HeaderComponent, CommonModule]
})
export class BillComponent implements OnInit{
[x: string]: any;
    billResult!: BillResponse;
    errorMessage!: string;
    cardNumber = this.loginService.getCustomer().creditCard.cardNumber;


    constructor(
        private loginService: LoginService,
        private billService: BillService
    ){}
    ngOnInit(): void {
        
        this.billService.getBill(this.cardNumber).subscribe({
            next: (value) => {
                this.billResult = value;
                
            },
            error:(error) => {
                this.errorMessage = error;
            },
        });

    }
    onPayBill(){
         this.billService.payBill(this.cardNumber).subscribe({
            next: (value) => {
                this.billResult = value;
            },
            error:(error) => {
                this.errorMessage = error;
            },
        });
    }

}
