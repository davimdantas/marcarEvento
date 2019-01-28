import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DefinyDate {
  //   private changes: [NgbDate, NgbDate, string, string, number[]];
  private intervalUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getChanges() {
    this.http.get('http://localhost:3000/api/interval').subscribe(postData => {
      console.log('\n postData: ', postData);
      this.intervalUpdated.next();
    });
  }
}
