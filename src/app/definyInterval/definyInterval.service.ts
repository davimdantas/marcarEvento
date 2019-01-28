import { EventEmitter } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

export class DefinyInterval {
  private changes: [NgbDate, NgbDate, string, string, number[]];
  private intervalUpdated = new Subject();

  getIntervalUpdateListener() {
    return this.intervalUpdated.asObservable();
  }

  addChanges(interval: [NgbDate, NgbDate, string, string, number[]]) {
    // const begginerDate = interval[0];
    // const endDate = interval[1];
    // const firsth = interval[2];
    // const lasth = interval[3];
    // const wdays = interval[4];
    // this.changes = [begginerDate, endDate, firsth, lasth, wdays];
    this.changes = [...interval];
    this.intervalUpdated.next(this.changes);
  }
}
