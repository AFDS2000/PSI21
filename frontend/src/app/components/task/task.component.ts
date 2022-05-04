import { Component, Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {TaskService} from '../../services/task.service';
import { Task } from '../../models/task';

interface Level {
  value: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  matcher!: MyErrorStateMatcher;
  nameFormControl!: FormControl;
  levelFormControl!: FormControl;
  levels: Level[] = [
    {value: ''},
    {value: 'urgente'}, 
    {value: 'alta'},
    {value: 'media'},
    {value: 'baixa'}
  ];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.levelFormControl =  new FormControl('', [Validators.required,Validators.nullValidator]);
    this.nameFormControl =  new FormControl('', [Validators.minLength(4),Validators.required,Validators.nullValidator]);
    this.matcher=new MyErrorStateMatcher(); 
    this.getTasks();
  }

  Submit(name:string,level:string,percentageConclusion=0,users=["626c11324067277550168083"]): void{ 
    if(this.levelFormControl.status!='INVALID' && this.nameFormControl.status!='INVALID'){
      name = name.trim();
      if (!name) { return; }
      this.taskService.addTask({ name,level,percentageConclusion,users } as Task)
        .subscribe(task => {
          this.tasks.push(task);
        });
        
    }
  }
  Delete(task: Task): void{ 
    
      this.tasks = this.tasks.filter(h => h !== task);
      this.taskService.deleteTask(task._id).subscribe();
  }
  getTasks(): void{
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    if (forbidden)
    return {forbiddenName: {value: control.value}} 
    else
    return null;
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                              : null;
  }
}


