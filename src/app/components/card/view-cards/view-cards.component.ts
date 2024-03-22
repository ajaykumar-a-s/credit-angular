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
  cardList: any[] = [];
  constructor(private cardService: CardService,private http: HttpClient,    private loginService: LoginService) {
  }
  ngOnInit(): void {
    if (this.loginService.isAdminLoggedIn()) {
    this.cardService.cardList().subscribe(
      { next: (response) => {
        this.cardList = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  else{
    this.cardList=[this.loginService.getCustomer().creditCard];

  }
  }
 

}
