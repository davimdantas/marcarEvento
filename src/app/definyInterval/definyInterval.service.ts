import { DefinyDate } from './../definyDate/definyDate.service';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Interval } from './interval.model';

@Injectable({ providedIn: 'root' })
export class DefinyInterval {
  private intervalToShare;
  private intervalUpdated = new Subject();
  constructor(private http: HttpClient, public definyDate: DefinyDate) {}

  getIntervalUpdateListener() {
    return this.intervalUpdated.asObservable();
  }

  getChanges() {
    this.http.get('http://localhost:3000/api/interval').subscribe(postData => {
      this.intervalUpdated.next();
    });
  }

//apagar
  getInterval() {
    return this.intervalToShare;
  }
//apagar
  changeDefinyDate(change) {
    this.definyDate.
  }

  addChanges(interval: Interval) {
    this.http.post('http://localhost:3000/api/interval', interval).subscribe(responseData => {
      console.log('\n', responseData);
      this.intervalUpdated.next(interval);
      this.intervalToShare = interval;
    });
    this.definyDate.addChanges(interval);
  }
}
