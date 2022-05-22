import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";

import { TaskService } from 'src/app/services/task.service';
import { UserService } from "src/app/services/user.service";

import { Task } from "src/app/models/task";
import { User } from "src/app/models/user";
import { Meeting } from "src/app/models/reuniao";

@Component({
  selector: 'app-view-calendars',
  templateUrl: './view-calendars.component.html',
  styleUrls: ['./view-calendars.component.scss']
})
export class ViewCalendarsComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  calendarTasks: Task[] = [new class implements Task {
    _id: string = "-";
    level: string = "-";
    name: string = "-";
    percentageConclusion: number = 0;
    users: Array<string> = ["0"];
    tsStart: number = 0;
    tsEnd: number = 0;
  }];

  calendarMeeting: Meeting[] = [new class implements Meeting {
    _id: string = "-";
    duration: string = "-";
    startDate: Date = new Date();
    endDate: Date = new Date();
    users: Array<User> = [];
    type: string = "-"
  }];

  displayedColumnsTasks: string[] = ['name', 'level', 'percentageConclusion', 'tsStart', 'tsEnd'];
  displayedColumnsMeetings: string[] = ['duration', 'period', 'type'];
  usersMap: Map<string, User> = new Map<string, User>();
  userSelectedId: string = "";

  constructor(
    private userService: UserService,
    private tasksService: TaskService,
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
  }

  toDateString (ts: number) {
    let date = new Date(ts);
    return !isNaN(date.getTime()) ? date.toLocaleDateString() : "-";
  }
}
