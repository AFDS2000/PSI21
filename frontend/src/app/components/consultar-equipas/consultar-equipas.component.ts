import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';

import { ConsultarEquipaService } from 'src/app/services/consultar-equipa.service';

@Component({
  selector: 'app-consultar-equipas',
  templateUrl: './consultar-equipas.component.html',
  styleUrls: ['./consultar-equipas.component.scss']
})
export class ConsultarEquipasComponent implements OnInit {

  teams: Team[] = [];

  constructor(private consultarEquipaService: ConsultarEquipaService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void{
    this.consultarEquipaService.getTeams().subscribe((teams) => 
      (this.teams = teams));
    
    
  }
 
}
