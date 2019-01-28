import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SelectDateComponent } from './definyInterval/select-date/select-date.component';
import { GenerateCalendarComponent } from './definyInterval/generate-calendar/generate-calendar.component';
// import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../libs/material/src/index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { DefinyInterval } from './definyInterval/definyInterval.service';
import { StartViewComponent } from './definyDate/start-view/start-view.component';

@NgModule({
  declarations: [AppComponent, SelectDateComponent, GenerateCalendarComponent, StartViewComponent],
  imports: [
    BrowserModule,
    // NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    MaterialModule,
    CdkTableModule,
    MatTableModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule
  ],
  exports: [MatCheckboxModule, MatRadioModule],
  providers: [MatDatepickerModule, DefinyInterval],
  bootstrap: [AppComponent]
})
export class AppModule {}
