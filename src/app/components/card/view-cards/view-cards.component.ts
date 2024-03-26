import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardComponent } from '../card.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CardService } from '../../../services/card.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';
LoginService
@Component({
  selector: 'app-view-cards',
  standalone: true,
  imports: [RouterOutlet, CardComponent,RouterLink,RouterLinkActive,FormsModule,NgFor,NgIf],
  templateUrl: './view-cards.component.html',
  styleUrl: './view-cards.component.css'
})
export class ViewCardsComponent implements OnInit {
  cardList!:any [];
  customerName!: string;
userRole: any;
  constructor(private cardService: CardService,private http: HttpClient,    private loginService: LoginService) {
  }
  
  ngOnInit(): void {
    if (this.loginService.isAdminLoggedIn()) {
      this.userRole='admin';
    this.cardService.cardList().subscribe(
      { next: (response) => {
        
        if(response!=null)
      {
        
          this.cardList = response;
          console.log(this.cardList)
     
      } 
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  else{
    if(this.loginService.getCustomer().creditCard!=null)
    this.cardList=[this.loginService.getCustomer().creditCard];
  this.userRole='customer';
  this.customerName=this.loginService.getCustomer().name;

  }
  }
  
  
 

}
