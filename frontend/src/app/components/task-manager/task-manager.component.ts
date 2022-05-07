import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Task} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import { MatTable } from '@angular/material/table';



@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {


  @ViewChild(MatTable) table!: MatTable<any>;

  tasks: Task[] = [];
  usersMap: Map<string, User> = new Map<string, User>();
  users: User[] = [];
  displayedColumns: string[] = ['name', 'level', 'percentageConclusion', 'users', 'edit'];

  editMode: boolean = false;

  usersEditing = new FormControl();
  taskEditingID: string = "";

  usersOnlyNameMap = (u: User): string => u.name

  constructor(private taskService: TaskService, private usersService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        this.usersMap.set(user._id, user);
      })
      this.getTasks();
    });
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
        this.table.renderRows();
      });
  }

  edit(taskID: string) {
    this.editMode = true;
    this.taskEditingID = taskID;
    let usersIDs: string[] = this.tasks.filter(e => e._id == taskID)[0].users
    let users = this.users.filter(u => usersIDs.indexOf(u._id) != -1);
    this.usersEditing.setValue(users.map(this.usersOnlyNameMap))
  }

  save() {
    let usersIDs: string[] = this.users.filter(u => this.usersEditing.value.indexOf(u.name) != -1).map(u => u._id);

    this.taskService.editUsersTask(this.taskEditingID, usersIDs)
      .subscribe((task) => {
        this.tasks[this.tasks.map(t=>t._id).indexOf(task._id)] = task;
        this.table.renderRows();
        this.editMode = false;
        this.taskEditingID = "";
      });
  }



}
