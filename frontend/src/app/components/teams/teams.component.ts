import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(    
    private route: ActivatedRoute,
    private teamService: TeamService,
    private location: Location
    ) { }
  teams: Array<Team> | undefined;
  ngOnInit(): void {
    this.getTeams();
  }
  getTeams(): void {
    this.teamService.getTeams()
    .subscribe(teams => this.teams = teams);
  }

  goBack(): void {
    this.location.back();
  }

}
