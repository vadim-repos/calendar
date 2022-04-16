import { Pipe, PipeTransform } from "@angular/core";
import * as dayjs from "dayjs";

@Pipe({
    name: 'dayjs',
    pure: false
})

export class DayjsPipe implements PipeTransform {
    transform(dayjs: dayjs.Dayjs | null, format:string = 'MMMM YYYY'):string {
        if(dayjs) {
            return dayjs.format(format);
        }       
        else {
            return ""
        } 
    }
}