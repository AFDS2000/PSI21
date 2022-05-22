import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";

import { TaskService } from 'src/app/services/task.service';
import { UserService } from "src/app/services/user.service";
import { Reuniao } from "src/app/models/reuniao";
import { ReuniaoService } from 'src/app/services/reuniao.service';

import { Task } from "src/app/models/task";
import { User } from "src/app/models/user";

@Component({
  selector: 'app-view-calendars',
  templateUrl: './view-calendars.component.html',
  styleUrls: ['./view-calendars.component.scss']
})
export class ViewCalendarsComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  calendarTasks: Task[] = [];
  calendarMeeting: Reuniao[] = [];
  displayedColumnsTasks: string[] = ['name', 'level', 'percentageConclusion', 'tsStart', 'tsEnd'];
  displayedColumnsMeetings: string[] = ['duration', 'period', 'hourStart', 'type'];
  usersMap: Map<string, User> = new Map<string, User>();
  userSelectedId: string = "";

  constructor(
    private userService: UserService,
    private tasksService: TaskService,
    private reuniaoService: ReuniaoService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        this.usersMap.set(user._id, user);
      })
    });
  }

  getUsersArray(): User[] {
    return Array.from(this.usersMap.values());
  }

  selectUser() {
    this.tasksService.getTasksUser(this.userSelectedId).subscribe((tasks) => this.calendarTasks = tasks);
    this.reuniaoService.getReuniaoUser(this.userSelectedId).subscribe((reunioes) => this.calendarMeeting = reunioes);
  }

  toDateString (ts: number) {
    let date = new Date(ts);
    return !isNaN(date.getTime()) ? date.toLocaleDateString() : "-";
  }
}
