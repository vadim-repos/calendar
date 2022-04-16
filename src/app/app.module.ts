import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { SelectorComponent } from './selector/selector.component';
import { DateService } from './shared/date.service';
import { DayjsPipe } from './shared/dayjs.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    OrganizerComponent,
    SelectorComponent,
    DayjsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
