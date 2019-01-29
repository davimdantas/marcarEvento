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
export class StartViewComponent implements OnInit, OnDestroy {
  private intervalSub: Subscription;

  infoInterval;

  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  generatedDays = [];
  calendarArray = [];
  columnArray = [];
  allowedDays = [0, 1, 2, 3, 4, 5, 6];
  dates = [];

  daysForTable = new BehaviorSubject(this.calendarArray);
  firstHour = 7;
  lastHour = 18;
  dataSource: Observable<any[]>;

  calendarGenerator(fHour: number, lHour: number) {
    const newObj = {};
    for (const eachday in this.dates) {
      if (this.dates.hasOwnProperty(eachday)) {
        const createdDate = new Date(this.dates[eachday]);
        const dayOfWeekGetter = createdDate.getDay();
        const monthGetter = createdDate.getMonth();
        const daygetter =
          createdDate.getDate() > 9 ? createdDate.getDate() : `0${createdDate.getDate()}`;
        if (this.allowedDays.includes(dayOfWeekGetter)) {
          Object.defineProperty(newObj, `ar${daygetter}${this.months[monthGetter]}`, {
            value: `${daygetter} ${this.months[monthGetter]}`,
            writable: true,
            configurable: true,
            enumerable: true
          });
          const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          const temporaryName = `ar${daygetter}${this.months[monthGetter]}`;
          const temporaryObj = {
            columnDef: temporaryName,
            header: days[dayOfWeekGetter],
            cell: function(column) {
              return `${column[temporaryName]}`;
            }
          };
          this.columnArray.push(temporaryObj);
        }
      }
    }
    this.calendarArray.push(newObj);

    for (let i = fHour; i <= lHour; i++) {
      const j = String(i);
      const newObj2 = {};
      for (const day in this.columnArray) {
        if (this.columnArray.hasOwnProperty(day)) {
          const h = this.columnArray[day].columnDef;
          //   const h = this.columnArray[day].columnDef[2] + this.columnArray[day].columnDef[3];
          Object.defineProperty(newObj2, `${h}`, {
            value: `${i < 10 ? 0 + j : j}:00`,
            writable: true,
            configurable: true,
            enumerable: true
          });
        }
      }
      this.calendarArray.push(newObj2);
    }
  }

  updateDays(changes) {
    console.log('\n Start View ngOnInit infoInterval: ', changes);

    this.firstHour = this.timeStringToInt(changes.firstHour);
    this.lastHour = this.timeStringToInt(changes.lastHour);
    this.allowedDays = [];
    this.allowedDays = changes.daysOfWeek;
    this.dates = [];
    this.columnArray = [];
    this.calendarArray = [];
    this.generatedDays = [];
    this.getDates(
      new Date(changes.firstDay.year, changes.firstDay.month - 1, changes.firstDay.day),
      new Date(changes.lastDay.year, changes.lastDay.month - 1, changes.lastDay.day)
    );
    this.daysForTable = new BehaviorSubject(this.calendarArray);

    this.calendarGenerator(this.firstHour, this.lastHour);

    this.columnArray.map(day => this.generatedDays.push(day.columnDef));

    this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)));
  }

  timeStringToInt(time: string): number {
    const hoursMinutes = time.split(/[.:]/);
    const hours = parseInt(hoursMinutes[0], 10);
    return hours;
  }

  getDates(startDate: Date, endDate: Date) {
    while (startDate <= endDate) {
      this.dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  constructor(public definyDate: DefinyDate) {}

  ngOnInit() {
    this.intervalSub = this.definyDate
      .getIntervalUpdateListener()
      .subscribe(objectThatFromService => {
        this.infoInterval = objectThatFromService;
        this.updateDays(this.infoInterval);
      });
  }

  ngOnDestroy() {
    this.intervalSub.unsubscribe();
  }
}
