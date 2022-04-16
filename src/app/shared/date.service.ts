import { Injectable } from "@angular/core";
import * as dayjs from 'dayjs';
import { BehaviorSubject } from "rxjs";

Injectable({
    providedIn: 'root'
})

export class DateService {
    public date:BehaviorSubject<dayjs.Dayjs> = new BehaviorSubject(dayjs());

    changeMonth(direction:number) {
        const val = this.date.value.add(direction, 'month');
        this.date.next(val);
    }

    changeDate(date:dayjs.Dayjs) {
        const value = this.date.value
            .set('date', date.date())
            .set('month', date.month())
        this.date.next(value)
    }
}