import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
    selector: 'app-projetos',
    templateUrl: './projetos.component.html',
    styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {
    projects: Project[] = [];
    teams: Team[] = [];
    allTeams: Team[] = [];
    project!: Project;
    projectForm!: FormGroup;

    constructor(private projetosService: ProjetosService) { }

    ngOnInit(): void {
        this.projectForm = this.createFormGroup();
        this.getProjects();
        this.getTeams();
        this.updateTeams();
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            projects: new FormControl("", []),
            teams: new FormControl("", []),

        });
    }
    getProjects(): void {
        this.projetosService.getProjects()
            .subscribe(projects => this.projects = projects);
    }

    getTeams(): void {
        this.projetosService.getTeams()
            .subscribe(allTeams => this.allTeams = allTeams);
    }
    associar(): void {
        this.project = this.projectForm.value.projects;
        this.project.teams = this.projectForm.value.teams;
        this.projetosService.updateTeam(this.project)
            .subscribe(() => {
                this.getProjects();
            });
    }

    updateTeams(): void {
        this.teams = []
        if (this.projectForm.value.projects == "" || this.projectForm.value.projects.teams == null) {
            for (var i = 0; i < this.allTeams.length; i++) {
                this.teams.push(this.allTeams[i]);
                for (var j = 0; j < this.projects.length; j++) {
                    if (this.teams.length > 0 && this.projects[j].teams == this.teams[this.teams.length - 1]._id && this.projectForm.value.projects.teams != this.teams[this.teams.length - 1]._id) {
                        this.teams.pop();
                    }
                }
            }
            this.projectForm.controls['teams'].setValue('', { onlySelf: true });
        } else {
            for (var i = 0; i < this.allTeams.length; i++) {
                this.teams.push(this.allTeams[i]);
                for (var j = 0; j < this.projects.length; j++) {
                    if (this.teams.length > 0 && this.projects[j].teams == this.teams[this.teams.length - 1]._id && this.projectForm.value.projects.teams != this.teams[this.teams.length - 1]._id) {
                        this.teams.pop();
                    }
                }
                if (this.teams.length > 0 && this.teams[this.teams.length - 1] != null && this.teams[this.teams.length - 1]._id == this.projectForm.value.projects.teams) {
                    this.projectForm.controls['teams'].setValue(this.teams[this.teams.length - 1], { onlySelf: true });
                }
            }
        }
    }
}
