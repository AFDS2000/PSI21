import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  divisibleBy30(control:FormGroup) {
    return parseInt(control.value) % 30 == 0 ? null : {
      divisibleBy30: true
    }
}

  diferenteDeZero(control:FormGroup) {
  return parseInt(control.value) != 0 ? null : {
    diferenteDeZero: true
  }
}
weekendsDatesFilter = (d: Date | null): boolean => {
  const day = (d || new Date()).getDay();

  return day !== 0 && day !== 6 ;
}



  createFormGroup(): FormGroup {
    return new FormGroup({
      users: new FormControl("",  [
        Validators.required]),
     
      type: new FormControl("",  [
        Validators.required]),

      startDate: new FormControl("",  [
        Validators.required]),

      endDate: new FormControl("",  [
        Validators.required]),

      duration: new FormControl("", [
        Validators.required,
        Validators.min(30),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        this.divisibleBy30,
        this.diferenteDeZero,
      ]),
      hourStart:new FormControl("",  [
        Validators.required]),

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
  const hourStart = this.reunioesForm.value.hourStart;

  let users: string[] = [];

  console.log(duration instanceof Number)

  for(let i=0; i<usersName.length; i++){
    users.push(this.usersMap.get(usersName[i])!._id);
  }

  console.log(users, startDate, endDate, type, duration, hourStart)

    this.criarReunioesService.addReuniao(
        {
  users,
  type,
  startDate,
  endDate,
  duration,
  hourStart,
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
