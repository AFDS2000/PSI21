import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CriarProjetoService } from 'src/app/services/criar-projeto.service'; 

import {Project} from '../../models/project';



@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrls: ['./lista-projetos.component.scss']
})
export class ListaProjetosComponent implements OnInit {
  viewForm!: FormGroup;
  projects: Project[] = [];

 

  constructor(private criarProjetoService : CriarProjetoService ) { }

  ngOnInit(): void {
    this.viewForm = this.createFormGroup()
    this.getProjects();
  }

createFormGroup(): FormGroup {
  return new FormGroup({
    name: new FormControl(''),
});
}

getProjects(): void {
  this.criarProjetoService.getProjects()
      .subscribe(projects => this.projects = projects);
}
  


}