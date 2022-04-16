import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { DateService } from '../shared/date.service';

interface Day {
  value: dayjs.Dayjs
  active: boolean
  disabled: boolean
  selected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[] | undefined

  constructor(private dateService:DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now:dayjs.Dayjs) {
    const startDay = now.startOf('month').startOf('week')
    const endDay = now.endOf('month').endOf('week')
    let date = startDay.subtract(1, 'day')
    const calendar = []
    
    while(date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
        .fill(0)
        .map(()=> {
          const value = date.add(1, 'day')
          const active = dayjs().isSame(value, 'day')
          const disabled = !now.isSame(value, 'month')
          const selected = now.isSame(value, 'date')
          date = value

          return {
            value, active, disabled, selected
          }
        })
      })
    }
    this.calendar = calendar
  }
  
  select(day:dayjs.Dayjs) {
    this.dateService.changeDate(day)
  }
}
