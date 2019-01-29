import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StartViewComponent } from './start-view/start-view.component';

@Injectable({ providedIn: 'root' })
export class DefinyDate {
  private intervalUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getIntervalUpdateListener() {
    return this.intervalUpdated.asObservable();
  }

  getChanges() {
    this.http.get('http://localhost:3000/api/interval').subscribe(postData => {
      console.log('\n postData: ', postData);
      this.intervalUpdated.next();
    });
  }

  addChanges(interval) {
    this.intervalUpdated.next(interval);
  }
}
