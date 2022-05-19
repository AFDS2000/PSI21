import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {MatTable} from "@angular/material/table";
import {Task} from "../../models/task";

@Component({
  selector: 'app-view-calendars',
  templateUrl: './view-calendars.component.html',
  styleUrls: ['./view-calendars.component.scss']
})
export class ViewCalendarsComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  @ViewChild(MatTable) table!: MatTable<any>;
  calendarItems: Task[] = [new class implements Task {
    _id: string = "-";
    level: string = "-";
    name: string = "-";
    percentageConclusion: number = 0;
    users: Array<string> = ["0"];
  }];
  displayedColumns: string[] = ['name', 'level', 'percentageConclusion'];

  usersMap: Map<string, User> = new Map<string, User>();

  userSelectedId: string = "";

  getUsersArray(): User[] {
    return Array.from(this.usersMap.values());
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        this.usersMap.set(user._id, user);
      })
    });
  }

  selectUser() {
  }
}
