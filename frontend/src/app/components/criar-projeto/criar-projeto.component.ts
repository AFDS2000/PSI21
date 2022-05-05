import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CriarProjetoService } from 'src/app/services/criar-projeto.service'; 

import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-projeto',
  templateUrl: './criar-projeto.component.html',
  styleUrls: ['./criar-projeto.component.scss']
})
export class CriarProjetoComponent implements OnInit {
  projectForm!: FormGroup;
   

  constructor(private  criarProjetoService: CriarProjetoService) { }

  minDate = new Date();

  ngOnInit(): void {
    this.projectForm = this.createFormGroup()
  }


  createFormGroup(): FormGroup {
    return new FormGroup({
        name: new FormControl("", [
            Validators.required, 
            Validators.minLength(4),
            Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),

        alias: new FormControl("", [
            Validators.required, 
            Validators.minLength(3),
            Validators.maxLength(3), 
            Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
       
        startDate: new FormControl("", [
            Validators.required,
        ]),

        endDate: new FormControl("")
    });
}

criarProjeto() {
    this.criarProjetoService.addProject(this.projectForm.value).subscribe((msg) => {
        if (msg) {
            Swal.fire({
                icon: 'success',
                title: 'Projeto criado com sucesso',
                showConfirmButton: false,
                timer: 1500
            });
            this.projectForm.reset()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao criar projeto',
            });
        }
    });
}



}
