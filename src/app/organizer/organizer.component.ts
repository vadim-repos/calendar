import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { DateService } from '../shared/date.service';
import { Task, TaskService } from '../shared/task.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form!: FormGroup;
  tasks:Task[] = [];

  constructor(public dateService:DateService, private taskService:TaskService) { }

  ngOnInit(): void {
    this.dateService.date
      .pipe(switchMap(value => this.taskService.load(value)))
      .subscribe(tasks => this.tasks = tasks)

    this.form = new FormGroup({    
      title: new FormControl('', Validators.required),
      recurrence: new FormControl('never')     
    })
  }

  onSubmit() {
    const {recurrence} = this.form.value
    const {title} = this.form.value

    console.log(recurrence)

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService
      .create(task)
      .subscribe(() => {
        this.tasks.push(task);
        this.form.reset}, 
      err => console.error(err))
  }

  removeTask(task:Task) {
    this.taskService
      .remove(task)
      .subscribe(
        () => {this.tasks = this.tasks.filter(t=> t.id !== task.id)},
        err => console.error(err)
      )
  }
}
