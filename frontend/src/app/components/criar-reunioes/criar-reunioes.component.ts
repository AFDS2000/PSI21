import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { Reuniao } from 'src/app/models/reuniao';

import { User } from 'src/app/models/user';
import { CriarReunioesService } from 'src/app/services/criar-reunioes.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-criar-reunioes',
  templateUrl: './criar-reunioes.component.html',
  styleUrls: ['./criar-reunioes.component.scss']
})
export class CriarReunioesComponent implements OnInit {
  reunioesForm!: FormGroup;
  usersMap: Map<string, User> = new Map<string, User>();
  users: User[] = [];
  editMode: boolean = false;
  usersEditing = new FormControl();
  usersOnlyNameMap = (u: User): string => u.name
  minDate = new Date();
  reuniao!: Reuniao;
  types: String[] = ["reuniao de equipa", "reuniao geral"];
  


  constructor(
    private criarReunioesService: CriarReunioesService,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        this.usersMap.set(user.name, user);
      })

    });
    this.reunioesForm = this.createFormGroup()
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      users: new FormControl(""),

      type: new FormControl(""),

      startDate: new FormControl(""),

      endDate: new FormControl(""),

      duration: new FormControl("")

    });
  }

  getUsers(): Observable<User[]> {
    return this.userService.getUsers();
  }


  criarReuniao() {
    
  const usersName = this.reunioesForm.value.users;
  const startDate = this.reunioesForm.value.startDate;
  const endDate = this.reunioesForm.value.endDate;
  const type = this.reunioesForm.value.type;
  const duration = this.reunioesForm.value.duration;

  let users: string[] = [];

  console.log(duration instanceof Number)

  for(let i=0; i<usersName.length; i++){
    users.push(this.usersMap.get(usersName[i])!._id);
  }

  console.log(users, startDate, endDate, type, duration)

    this.criarReunioesService.addReuniao(
        {
  users,
  type,
  startDate,
  endDate,
  duration,
} as Reuniao).subscribe((msg) => { if (msg) {
  Swal.fire({
    icon: 'success',
    title: 'Reuniao criada com sucesso',
    showConfirmButton: false,
    timer: 1500
  });
  this.reunioesForm.reset()
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Erro ao criar reuniao',
  });
} });

/*
   this.criarReunioesService.addReuniao(this.reunioesForm.value).subscribe((msg) => {
      if (msg) {
        Swal.fire({
          icon: 'success',
          title: 'Reuniao criada com sucesso',
          showConfirmButton: false,
          timer: 1500
        });
        this.reunioesForm.reset()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao criar reuniao',
        });
      }
    }); */
  }

}
