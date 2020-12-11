import { Component } from '@angular/core';

import { NastavaService } from './nastava.service';
import { SkolskiSati } from './SkolskiSati';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  vrijemeSada: Date;
  skolskiSat: SkolskiSati = null;

  constructor(private nastavaService: NastavaService) {
    const nastava = this.nastavaService.getAllSkolskiSati();

    setInterval(() => {
      this.vrijemeSada = new Date();

      if (this.vrijemeSada.getDay() > 5) {
        this.skolskiSat = {
          interval: { pocetak: { sati: 0, minute: 0 }, kraj: { sati: 0, minute: 0 } },
          poruka: { kratkaPoruka: 'Nema nastave!!', dugaPoruka: 'Vikendom nema nastave.' },
          nastavaUTijeku: false,
          doKraja: 0,
          odPocetka: 0,
          odmor: false,
          velikiOdmor: false,
          sat: 0,
          satUTijeku: false,
          smjena: 'vikend',
          image: 'clock.jpg',
        };
      } else {
        nastava.forEach(element => {
          if (this.nastavaService.isBetween(element.interval, this.vrijemeSada)) {
            this.skolskiSat = element;
            this.skolskiSat.odPocetka = this.nastavaService.difference(element.interval.pocetak, this.vrijemeSada);
            this.skolskiSat.doKraja = this.nastavaService.difference(element.interval.kraj, this.vrijemeSada);
          }
        });
      }
    }, 1000);
  }
}
