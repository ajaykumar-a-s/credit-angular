import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
    creditCard !: any;
    cardNumber !: string;


    constructor(
        private loginService: LoginService,
        private billService: BillService,
        private router : Router
    ){}
    ngOnInit(): void {
      
        this.creditCard = this.loginService.getCustomer().creditCard;
        if(this.creditCard){
            this.cardNumber = this.loginService.getCustomer().creditCard.cardNumber;
            this.billService.getBill(this.cardNumber).subscribe({
                next: (value) => {
                    this.billResult = value;
                    
                },
                error:(error) => {
                    this.errorMessage = error;
                },
            });
        }
        else{
            this.router.navigate(['/card/request']);
        }
        console.log(this.creditCard);
        

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
