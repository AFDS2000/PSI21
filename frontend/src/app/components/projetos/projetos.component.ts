import {  Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
    selector: 'app-projetos',
    templateUrl: './projetos.component.html',
    styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<any>;
    projects: Project[] = [];
    teamsMap: Map<string, Team> = new Map<string, Team>();
    projectsMap: Map<string, Project> = new Map<string, Project>();
    teams: Team[] = [];
    displayedColumns: string[] = ['name', 'alias', 'team', 'edit'];
    editMode: boolean = false;
    teamsEditing = new FormControl();
    teamsOnlyNameMap = (t: Team): string => t.name
    project!: Project;

    constructor(private projetosService: ProjetosService ) { }

    ngOnInit(): void {
 this.getTeams();
 this.getProjects();
 this.table.renderRows();
    }
    getTeams():void {
        this.projetosService.getTeams().subscribe(teams => {
            this.teams = teams;
            this.teams.forEach(team => {
                this.teamsMap.set(team._id, team);
            })
        });

    }
    getProjects(): void {
        this.projetosService.getProjects()
            .subscribe(projects =>{
                this.projects = projects;
                this.projects.forEach(project => {
                    this.projectsMap.set(project._id,project);
                })
                if(this.table){
                    this.table.renderRows();
                }
            });
    }

    edit(projectID: string) {
        
        this.editMode = true;
        var teamsMapTemp = new Map<string, Team>(this.teamsMap);

            for(var j  = 0;j< this.projects.length;j++){
                if(this.projects[j].teams!=null && this.projects[j].teams != this.projectsMap.get(projectID)?.teams ){
                    teamsMapTemp.delete(this.projects[j].teams!);
                }
                if(this.projects[j].teams!=null && this.projects[j].teams == this.projectsMap.get(projectID)?.teams ){
                    this.teamsEditing.setValue( teamsMapTemp.get(this.projects[j].teams!));
                }
                
            }
            if(this.projectsMap.get(projectID)?.teams ==null ){
                this.teamsEditing.setValue( null);
            }
            this.project = this.projectsMap.get(projectID)!;
            this.teams = Array.from( teamsMapTemp.values() );
            
    }

    save() {
        this.project.teams = this.teamsEditing.value;
        this.projetosService.updateTeam(this.project)
            .subscribe(() => {
                this.getProjects();
                this.editMode = false;
                if(this.table){
                    this.table.renderRows();
                }
            });
    }
}
