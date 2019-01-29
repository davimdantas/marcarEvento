import { DefinyDate } from './../definyDate/definyDate.service';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Interval } from './interval.model';

@Injectable({ providedIn: 'root' })
export class DefinyInterval {
  private changes: [NgbDate, NgbDate, string, string, number[]];
  private intervalUpdated = new Subject();
  private testingBackend = null;

  constructor(private http: HttpClient, public definyDate: DefinyDate) {}
  getIntervalUpdateListener() {
    return this.intervalUpdated.asObservable();
  }

  getChanges() {
    this.http.get('http://localhost:3000/api/interval').subscribe(postData => {
      this.testingBackend = postData[3];
      this.intervalUpdated.next();
    });
  }

  addChanges(interval: Interval) {
    this.http.post('http://localhost:3000/api/interval', interval).subscribe(responseData => {
      console.log('\n', responseData);
      this.intervalUpdated.next(interval);
    });
    this.definyDate.getChanges();
  }
}
