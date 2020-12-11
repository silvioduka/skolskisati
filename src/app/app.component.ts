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

      nastava.forEach(element => {
        if (this.nastavaService.isBetween(element.interval, this.vrijemeSada)) {
          this.skolskiSat = element;
          this.skolskiSat.odPocetka = this.nastavaService.difference(element.interval.pocetak, this.vrijemeSada);
          this.skolskiSat.doKraja = this.nastavaService.difference(element.interval.kraj, this.vrijemeSada);
        }
      });
    }, 1000);
  }
}
