import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ConsultarEquipaService } from 'src/app/services/consultar-equipa.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  team!: Team;
  displayedColumns: string[] = ['name'];

  constructor(private consultarService: ConsultarEquipaService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
  
    this.getTeam();
    console.log(this.team);
  }
  
  getTeam(): void {
    const id : string = this.route.snapshot.paramMap.get('id')!;
    
    this.consultarService.getTeam(id).subscribe((team) => (this.team = team));
  }

}
