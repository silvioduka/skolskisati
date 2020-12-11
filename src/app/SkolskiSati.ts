import { Sat } from './Sat';
import { Poruka } from "./Poruka";
import { Interval } from "./Interval";

export interface SkolskiSati {
  interval: Interval;
  poruka: Poruka;
  smjena: string;
  nastavaUTijeku: boolean;
  sat: number;
  satUTijeku: boolean;
  odPocetka: number;
  doKraja: number;
  odmor: boolean;
  velikiOdmor: boolean;
  image: string;
}
