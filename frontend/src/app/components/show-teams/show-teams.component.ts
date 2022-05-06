import { Component, OnInit } from '@angular/core';

import { TeamService } from 'src/app/services/team.service';

import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-show-teams',
  templateUrl: './show-teams.component.html',
  styleUrls: ['./show-teams.component.scss']
})
export class ShowTeamsComponent implements OnInit {

  teams: Team[] = [];
  displayedColumns: string[] = ['name'];
  

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void{
    this.teamService.getTeams().subscribe((teams) => 
      (this.teams = teams));  
  }
  
  
}
