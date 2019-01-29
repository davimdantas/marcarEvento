import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface Interval {
  firstDay: NgbDate | null;
  lastDay: NgbDate | null;
  firstHour: string;
  lastHour: string;
  daysOfWeek: number[];
}
