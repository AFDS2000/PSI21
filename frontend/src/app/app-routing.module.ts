import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { ConsultarEquipasComponent } from './components/consultar-equipas/consultar-equipas.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';

import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './components/task/task.component';
import { ShowTeamsComponent } from './components/show-teams/show-teams.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'criarEquipa', component: CreateTeamComponent},
    { path: 'consultar', component: ConsultarEquipasComponent, 
    children: [{path: 'equipaDetail/:id', component: TeamDetailComponent}, {path: 'equipaDetail', component: ShowTeamsComponent}]
    
    },

    { path: 'criarUtilizador', component: SignupComponent, canActivate: [AuthGuardService, AdminGuardService] },
    { path: 'tasks', component: TaskComponent,canActivate: [AuthGuardService] },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
