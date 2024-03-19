import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CardComponent } from '../card.component';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';
import { CardService } from '../../../services/card.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-card-request',
  standalone: true,
  imports: [CardComponent,RouterOutlet,RouterModule,CommonModule],
  templateUrl: './card-request.component.html',
  styleUrl: './card-request.component.css'
})

export class CardRequestComponent {
  inputValue: any;
  inputBox: any;
  response: string = '';
 

  constructor(private http: HttpClient, private loginService: LoginService,private cardService:CardService) { }
 
  onButtonClick() {
    const customerId=this.loginService.getCustomer().customerId;
    // console.log(customerId);
  
      this.cardService.requestCard(customerId).subscribe(
        { next: (response) => { 
          this.response ="Succesfully Requested...!"; 
       console.log(response);
        },
        error: (error) => { 
          this.response = error; 
          console.log(error);
         
        }
      });
    }
  }
