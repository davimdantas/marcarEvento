import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { StartViewComponent } from './start-view/start-view.component';

@Injectable({ providedIn: 'root' })
export class DefinyDate {
  private intervalUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getIntervalUpdateListener() {
    return this.intervalUpdated.asObservable();
  }

  // async getChanges() {
  //   console.log('\n start ');
  //   return await this.http.get('http://localhost:3000/api/interval');
  // }

  // getChanges() {
  //   let teste;
  //   this.http.get('http://localhost:3000/api/interval').subscribe(async (response) => teste = await response);
  //   return teste;
  // }

  getChanges() {
    return this.http.get('http://localhost:3000/api/interval');
  }

  // getChanges() {
  //   this.http.get('http://localhost:3000/api/interval').subscribe(postData => {
  //     const teste = postData;
  //     this.intervalUpdated.next();
  //     console.log('\n getChanges teste: ', teste);
  //     return postData;
  //   });
  // }

  addChanges(interval) {
    this.intervalUpdated.next(interval);
  }
}
