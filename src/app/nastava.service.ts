import { Injectable } from '@angular/core';
import { Interval } from './Interval';

import { Sat } from './Sat';
import { skolskiSati } from './skolski-sati.db';
import { SkolskiSati } from './SkolskiSati';

@Injectable({
  providedIn: 'root',
})
export class NastavaService {


  constructor() {}

  getAllSkolskiSati(): SkolskiSati[] {
    return skolskiSati;
  }

  convertTimeFromDate(timeToConvert: Date): number {
    return timeToConvert.getHours() * 60 + timeToConvert.getMinutes();
  }

  getTimeFromHHMM(sat: Sat): number {
    return sat.sati * 60 + sat.minute;
  }

  difference(sat1: Sat, sat2: Date) {
    return Math.abs(
      this.getTimeFromHHMM(sat1) -
        this.getTimeFromHHMM({ sati: sat2.getHours() as number, minute: sat2.getMinutes() as number } as Sat)
    );
  }

  isBetween(interval: Interval, timeBetween: Date): boolean {
    if (this.isGreaterThan(timeBetween, interval.pocetak) && this.isLessThan(timeBetween, interval.kraj)) {
      // console.log('BETWEEN: ', `${interval.pocetak.sati}:${interval.pocetak.minute} - ${interval.kraj.sati}:${interval.kraj.minute} - ${timeBetween.getHours()}:${timeBetween.getMinutes()}:${timeBetween.getSeconds()}`);
      return true;
    }

    return false;
  }

  isLessThan(timeBetween: Date, sat: Sat): boolean {
    if (this.convertTimeFromDate(timeBetween) < this.getTimeFromHHMM(sat)) {
      return true;
    }

    return false;
  }

  isGreaterThan(timeBetween: Date, sat: Sat): boolean {
    if (this.convertTimeFromDate(timeBetween) >= this.getTimeFromHHMM(sat)) {
      return true;
    }

    return false;
  }
}
