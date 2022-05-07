import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TeamService } from 'src/app/services/team.service'
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-team',
    templateUrl: './create-team.component.html',
    styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
    teamForm!: FormGroup;
  

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamForm = this.createFormGroup();
    
  } 
  
  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [
          Validators.required, 
          Validators.minLength(4),
          Validators.pattern(/^[a-zA-Z0-9 ]*$/)

        ])
      }
      );
  }
  
  criarEquipa() {
    this.teamService.addTeam(this.teamForm.value).subscribe((msg) => {
      if (msg) {
        Swal.fire({
            icon: 'success',
            title: 'Equipa criado com sucesso',
            showConfirmButton: false,
        });
        
        this.teamForm.reset()
      } else {
          Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Erro ao criar a Equipa',
          });
      }
    });
  }

  



}
