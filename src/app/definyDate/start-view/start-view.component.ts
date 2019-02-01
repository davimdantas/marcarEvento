import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DefinyDate } from '../definyDate.service';
import { getDefaultService } from 'selenium-webdriver/opera';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {
  objectFromServer;

  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  generatedDays = [];
  calendarArray = [];
  columnArray = [];
  allowedDays = [0, 1, 2, 3, 4, 5, 6];
  dates = [];
  daysForTable = new BehaviorSubject(this.calendarArray);
  firstHour = 7;
  lastHour = 18;

  meses = {
    Jan: 0,
    Fev: 1,
    Mar: 2,
    Abr: 3,
    Mai: 4,
    Jun: 5,
    Jul: 6,
    Ago: 7,
    Set: 8,
    Out: 9,
    Nov: 10,
    Dez: 11
  };

  firstClick = {
    hour: 1,
    hourString: '01:00',
    day: 0,
    month: 0,
    defined: false
  };
  secondClick = {
    hour: 1,
    hourString: '01:00',
    day: 0,
    month: 0,
    defined: false
  };
  hourClickedFirst = 1;
  elementWithDesireClass;
  firstElement;
  secondElement;

  hoveredElements = [];

  hoursToHighlight = [];
  dataSource: Observable<any[]>;

  onDateSelection(date) {
    const hour = parseInt(date.srcElement.innerHTML.substring(0, 2), 10);
    const hourString = date.srcElement.innerHTML;
    const day = parseInt(date.toElement.classList[2].substring(13, 15), 10);
    const month = this.meses[date.toElement.classList[2].substring(15, 18)];
    const classes = date.toElement.classList.value;
    const elements = document.getElementsByClassName(classes);
    for (const i in elements) {
      if (elements.hasOwnProperty(i) && elements[i].innerHTML === hourString) {
        this.elementWithDesireClass = elements[i];
      }
    }

    if (this.firstClick.defined === false && hourString.substring(3, 5) === '00') {
      this.firstClick.month = month;
      this.firstClick.day = day;
      this.firstClick.hour = hour;
      this.firstClick.hourString = hourString;
      this.firstClick.defined = true;
      this.firstElement = this.elementWithDesireClass;
      this.firstElement.classList.add('highlighted');
    } else if (
      hour > this.firstClick.hour &&
      day === this.firstClick.day &&
      month === this.firstClick.month &&
      this.secondClick.defined === false
    ) {
      this.secondElement = this.elementWithDesireClass;
      this.secondElement.classList.add('highlighted');
      this.secondClick.month = month;
      this.secondClick.day = day;
      this.secondClick.hour = hour;
      this.secondClick.hourString = hourString;

      this.secondClick.defined = true;
    } else if (hourString.substring(3, 5) === '00') {
      this.removeClass('hovered');
      this.firstElement.classList.remove('highlighted');
      this.firstClick.month = month;
      this.firstClick.day = day;
      this.firstClick.hour = hour;
      this.firstClick.hourString = hourString;

      this.elementWithDesireClass.classList.add('highlighted');
      this.firstElement = this.elementWithDesireClass;

      this.firstClick.defined = true;
      this.secondClick.defined = false;
      this.secondElement.classList.remove('highlighted');
    }

    if (this.firstClick.defined === true && this.secondClick.defined === true) {
      console.log('\n No IFFFF');
      this.hoursToHighlight = [];

      for (let hora = this.firstClick.hour + 1; hora < this.secondClick.hour; hora++) {
        this.hoursToHighlight.push(`${hora < 10 ? '0' + hora : hora}:00`);
      }

      for (const i in elements) {
        if (elements.hasOwnProperty(i) && this.hoursToHighlight.includes(elements[i].innerHTML)) {
          elements[i].classList.add('hovered');
          this.hoveredElements.push(elements[i]);
        }
      }
    }
  }
  removeClass(classToRemove: string) {
    for (const position in this.hoveredElements) {
      if (this.hoveredElements.hasOwnProperty(position)) {
        console.log('\n this.hoveredElements ', this.hoveredElements[position]);
        this.hoveredElements[position].classList.remove(classToRemove);
      }
    }
    this.hoveredElements = [];
  }

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

  updateDates() {
    this.definyDate.getChanges().subscribe(response => {
      this.objectFromServer = response;
      this.firstHour = this.timeStringToInt(this.objectFromServer.firstHour);
      this.lastHour = this.timeStringToInt(this.objectFromServer.lastHour);
      this.allowedDays = [];
      this.allowedDays = this.objectFromServer.daysOfWeek;
      this.getDates(
        new Date(
          this.objectFromServer.firstDay.year,
          this.objectFromServer.firstDay.month - 1,
          this.objectFromServer.firstDay.day
        ),
        new Date(
          this.objectFromServer.lastDay.year,
          this.objectFromServer.lastDay.month - 1,
          this.objectFromServer.lastDay.day
        )
      );
      this.calendarGenerator(this.firstHour, this.lastHour);
      this.columnArray.map(day => this.generatedDays.push(day.columnDef));
      this.dataSource = this.daysForTable.pipe(map(v => Object.values(v)));
    });
  }
  highlight(element: Element) {
    element.highlighted = !element.highlighted;
  }

  constructor(public definyDate: DefinyDate) {}

  async ngOnInit() {
    this.updateDates();
  }
}

export interface Element {
  checked: boolean;
  name: string;
  position: number;
  weight: number;
  symbol: string;
  highlighted?: boolean;
  hovered?: boolean;
}
