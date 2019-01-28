import { DefinyDate } from './../definyDate/definyDate.service';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DefinyDate } from '../definyDate/definyDate.service';

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

  addChanges(interval: [NgbDate, NgbDate, string, string, number[]]) {
    const begginerDate = interval[0];
    const endDate = interval[1];
    const firsth = interval[2];
    const lasth = interval[3];
    const wdays = interval[4];
    this.changes = [begginerDate, endDate, firsth, lasth, wdays];
    // this.changes = [...interval];
    this.http.post('http://localhost:3000/api/interval', this.changes).subscribe(responseData => {
      console.log('\n', responseData);
      this.intervalUpdated.next(this.changes);
    });
    this.definyDate.getChanges();
  }
}
