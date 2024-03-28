import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CardService } from '../../../services/card.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-view-requests',
  standalone: true,
  templateUrl: './view-requests.component.html',
  styleUrl: './view-requests.component.css',
  imports: [NgIf, NgFor, HeaderComponent],
})
export class ViewRequestsComponent implements OnInit {
  closeModal() {
    throw new Error('Method not implemented.');
  }
  validate(arg0: any) {
    throw new Error('Method not implemented.');
  }
  requestedCardList: any[] = [];
  response: any;

  constructor(
    private http: HttpClient,
    private cardService: CardService,
  ) {}
  ngOnInit(): void {
    this.cardService.getRequestedCardList().subscribe({
      next: (response) => {
        this.requestedCardList = response;
        // console.log(response);
      },
      error: (error) => {
        this.response = error;
        console.log(error);
      },
    });
  }
  approve(creditCardRequestId: number) {
    this.cardService.validate(creditCardRequestId).subscribe({
      next: (response) => {
        this.response = 'Request approved successfully';
        console.log(response);

        this.requestedCardList = this.requestedCardList.filter(
          (card) => card.creditCardRequestId !== creditCardRequestId
        );
      },
      error: (error: any) => {
        // this.response = error;
        this.response = 'There was an error while approving the request';

        console.log(error);
      },
    });
  }
}
