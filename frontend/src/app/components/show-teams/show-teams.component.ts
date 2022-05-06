import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { AdicionarUserService } from 'src/app/services/adicionar-user.service';
import { ConsultarEquipaService } from 'src/app/services/consultar-equipa.service';

@Component({
  selector: 'app-show-teams',
  templateUrl: './show-teams.component.html',
  styleUrls: ['./show-teams.component.scss']
})
export class ShowTeamsComponent implements OnInit {

  teams: Team[] = [];
  team!: Team;
  user!: User;
  displayedColumns: string[] = ['name'];
  

  constructor(private consultarEquipaService: ConsultarEquipaService, private adicionarUser: AdicionarUserService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void{
    this.consultarEquipaService.getTeams().subscribe((teams) => 
      (this.teams = teams));  
  }
  
  
}
