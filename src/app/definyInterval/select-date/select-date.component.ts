import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { DefinyInterval } from '../definyInterval.service';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {
  //   @Output() clicked = new EventEmitter();
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  @Input() firstDay;

  dateArray: [NgbDate, NgbDate, string, string, number[]] = [
    this.fromDate,
    this.toDate,
    '08:00',
    '17:00',
    [0, 1, 2, 3, 4, 5, 6]
  ];

  submitted = false;

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  diasDasemana = {
    domingo: true,
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: true
  };

  gerarArrayDiasDasemana() {
    this.dateArray[4] = [];
    let contador = 0;
    for (const i in this.diasDasemana) {
      if (this.diasDasemana.hasOwnProperty(i)) {
        if (this.diasDasemana[i] === true) {
          this.dateArray[4].push(contador);
        }
        contador += 1;
      }
    }
  }

  constructor(
    config: NgbDatepickerConfig,
    calendar: NgbCalendar,
    public definyInterval: DefinyInterval
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 25);
    config.outsideDays = 'hidden';
  }

  onSubmit() {
    this.submitted = true;
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.toDate && this.fromDate) {
      this.dateArray[0] = this.fromDate;
      this.dateArray[1] = this.toDate;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  updateDates() {
    this.gerarArrayDiasDasemana();
    // this.clicked.emit(this.dateArray);
    this.definyInterval.addChanges(this.dateArray);
  }

  ngOnInit() {
    this.gerarArrayDiasDasemana();
  }
}
