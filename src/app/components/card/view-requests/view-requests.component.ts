import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CardService } from '../../../services/card.service';


@Component({
  selector: 'app-view-requests',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css'
})
export class ViewRequestsComponent implements OnInit{
validate(arg0: any) {
throw new Error('Method not implemented.');
}
requestedCardList: any[]=[];
  response:any;
 
  
  constructor(private http: HttpClient,private cardService:CardService) { 
   
  }
  ngOnInit(): void {
    this.cardService.getRequestedCardList().subscribe(
      { next: (response) => { 
        this.requestedCardList=response; 
    // console.log(response);
      },
      error: (error) => { 
        this.response = error; 
        console.log(error);
       
      }
    });
  }
  approve(creditCardRequestId: number) {
    this.cardService.validate(creditCardRequestId)
      .subscribe({
        next: (response) => {
          this.response = "Successfully validated...!";
          console.log(response);

                this.requestedCardList = this.requestedCardList.filter(card => card.creditCardRequestId !== creditCardRequestId);
      },
        error: (error: any) => {
          this.response = error;
          console.log(error);
        }
      });
  }
}