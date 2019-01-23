import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';

class ChangesForTable {
  constructor(
    public horaI: string,
    public horaF: string,

    public diasDaSemana: []

  ) { }
}

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {


  @Output() clicked = new EventEmitter();
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  @Input() firstDay;

  @Input() lastDay;

  dateArray = [];

  submitted = false;

  mudancas = new ChangesForTable('', '', []);

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

  arrayDiasDasemana = [];

  gerarArrayDiasDasemana() {
    this.arrayDiasDasemana = [];
    let contador = 0;
    for (const i in this.diasDasemana) {
      if (this.diasDasemana.hasOwnProperty(i)) {

        if (this.diasDasemana[i] === true) {
          this.arrayDiasDasemana.push(contador);
        }
        contador += 1;
      }
    }
  }

  constructor(config: NgbDatepickerConfig, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    config.outsideDays = 'hidden';
    // console.log('\n Antes: ', this.fromDate, ' | ', this.toDate);
  }

  onSubmit() {
    this.submitted = true;
  }
  saveHour(hour) {
    console.log('\n aqui ', hour);
  }

  getCurrentModel() {
    return JSON.stringify(this.mudancas);
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

    this.dateArray = []
    if (this.toDate && this.fromDate) {
      console.log('\n fromDate', this.fromDate);
      this.dateArray.push(this.fromDate, this.toDate);

    }
  }


  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);

  }


  updateDates() {
    this.gerarArrayDiasDasemana()
    this.dateArray[2] = this.mudancas.horaI;
    this.dateArray[3] = this.mudancas.horaF;
    this.dateArray[4] = this.arrayDiasDasemana;
    this.clicked.emit(this.dateArray);
  }



  ngOnInit() {
    this.gerarArrayDiasDasemana();
  }
}
