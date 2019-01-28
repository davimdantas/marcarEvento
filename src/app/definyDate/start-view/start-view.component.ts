import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DefinyDate } from '../definyDate.service';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {
  //   dateGenerated = new Date();
  //   currentlyDay = this.dateGenerated.getDate();
  //   currentlyMonth = this.dateGenerated.getMonth();
  //   // months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  //   months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  //   formattedMonth = this.months[this.currentlyMonth];
  //   currentlyYear = this.dateGenerated.getFullYear();
  //   UltimoDia = new Date(this.currentlyYear, this.currentlyMonth, 0);
  //   firstWDayOfMonth = new Date(this.currentlyYear, this.currentlyMonth).getDay();
  //   daysOfMonth = new Date(this.currentlyYear, this.currentlyMonth, 0).getDate();
  //   firstDate = {
  //     year: this.dateGenerated.getUTCFullYear(),
  //     month: this.currentlyMonth + 1,
  //     day: this.currentlyDay
  //   };

  //   firstHour = 7;
  //   lastHour = 18;
  //   generatedDays = [];
  //   calendarArray = [];
  //   columnArray = [];
  //   daysForTable = new BehaviorSubject(this.calendarArray);
  //   dataSource: Observable<any[]>;
  //   allowedDays = [0, 1, 2, 3, 4, 5, 6];
  //   dates = [];

  //   getDates(startDate: Date, endDate: Date) {
  //     while (startDate <= endDate) {
  //       this.dates.push(new Date(startDate));
  //       startDate.setDate(startDate.getDate() + 1);
  //     }
  //   }

  //   calendarGenerator(fHour: number, lHour: number) {
  //     const newObj = {};
  //     for (const eachday in this.dates) {
  //       if (this.dates.hasOwnProperty(eachday)) {
  //         const createdDate = new Date(this.dates[eachday]);
  //         const dayOfWeekGetter = createdDate.getDay();
  //         const monthGetter = createdDate.getMonth();
  //         const daygetter =
  //           createdDate.getDate() > 9 ? createdDate.getDate() : `0${createdDate.getDate()}`;
  //         if (this.allowedDays.includes(dayOfWeekGetter)) {
  //           Object.defineProperty(newObj, `ar${daygetter}${this.months[monthGetter]}`, {
  //             value: `${daygetter} ${this.months[monthGetter]}`,
  //             writable: true,
  //             configurable: true,
  //             enumerable: true
  //           });
  //           const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  //           const temporaryName = `ar${daygetter}${this.months[monthGetter]}`;
  //           const temporaryObj = {
  //             columnDef: temporaryName,
  //             header: days[dayOfWeekGetter],
  //             cell: function(column) {
  //               return `${column[temporaryName]}`;
  //             }
  //           };
  //           this.columnArray.push(temporaryObj);
  //         }
  //       }
  //     }
  //     this.calendarArray.push(newObj);

  //     for (let i = fHour; i <= lHour; i++) {
  //       const j = String(i);
  //       const newObj2 = {};
  //       for (const day in this.columnArray) {
  //         if (this.columnArray.hasOwnProperty(day)) {
  //           const h = this.columnArray[day].columnDef;
  //           //   const h = this.columnArray[day].columnDef[2] + this.columnArray[day].columnDef[3];
  //           Object.defineProperty(newObj2, `${h}`, {
  //             value: `${i < 10 ? 0 + j : j}:00`,
  //             writable: true,
  //             configurable: true,
  //             enumerable: true
  //           });
  //         }
  //       }
  //       this.calendarArray.push(newObj2);
  //     }
  //   }

  //   // triggered by slect-date updateDates()
  //   updateDays(changes: [NgbDate, NgbDate, string, string, number[]]) {
  //     this.firstHour = this.timeStringToInt(changes[2]);
  //     this.lastHour = this.timeStringToInt(changes[3]);
  //     this.allowedDays = [];
  //     this.allowedDays = changes[4];
  //     this.dates = [];
  //     this.columnArray = [];
  //     this.calendarArray = [];
  //     this.generatedDays = [];
  //     this.getDates(
  //       new Date(changes[0].year, changes[0].month - 1, changes[0].day),
  //       new Date(changes[1].year, changes[1].month - 1, changes[1].day)
  //     );
  //     this.daysForTable = new BehaviorSubject(this.calendarArray);

  //     this.calendarGenerator(this.firstHour, this.lastHour);

  //     this.columnArray.map(day => this.generatedDays.push(day.columnDef));

  //     this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)));
  //   }

  //   timeStringToInt(time: string): number {
  //     const hoursMinutes = time.split(/[.:]/);
  //     const hours = parseInt(hoursMinutes[0], 10);
  //     return hours;
  //   }

  constructor(public definyDate: DefinyDate) {}

  ngOnInit() {
    // this.getDates(
    //   new Date(this.currentlyYear, this.currentlyMonth, this.currentlyDay),
    //   new Date(2019, 1, 21)
    // );
    // this.calendarGenerator(this.firstHour, this.lastHour);
    // this.columnArray.map(day => this.generatedDays.push(day.columnDef));
    // this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)));
    // this.updateDays();
    console.log('\n Aquiii', this.definyDate.getChanges());
  }

  //   ngOnDestroy() {
  //     this.intervalSub.unsubscribe();
  //   }
}
