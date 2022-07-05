import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
  };

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardsService.getAllCards().subscribe((Response) => {
      this.cards = Response;
    });
  }
  onSubmit() {
    this.cardsService.addCard(this.card)
    .subscribe(
      Response => {    
        this.getAllCards();
        this.card = {
          id:'',
          cardholderName:'',
          cardNumber:'',
          cvc:'',
          expiryMonth:'',
          expiryYear:''
        };
      }
    )
  }
  deleteCard(id:string){
    this.cardsService.deleteCard(id).subscribe((Response) => {
      this.getAllCards();
    });
  }
}
