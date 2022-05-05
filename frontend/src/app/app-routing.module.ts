import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

import { CriarProjetoComponent } from './components/criar-projeto/criar-projeto.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './components/task/task.component';
import { HomeComponent } from './components/home/home.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home/myTasks' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
    { path: 'home', component: HomeComponent , canActivate: [AuthGuardService], children: [{
        path: 'myTasks', component: MyTasksComponent, canActivate: [AuthGuardService]
    }]},
    { path: 'criarEquipa', component: CreateTeamComponent, canActivate: [AuthGuardService, AdminGuardService] },
    { path: 'criarUtilizador', component: SignupComponent, canActivate: [AuthGuardService, AdminGuardService] },
    { path: 'tasks', component: TaskComponent, canActivate: [AuthGuardService] },
    { path: 'criarProjeto', component: CriarProjetoComponent, canActivate: [AuthGuardService, AdminGuardService] },
    { path: '**', component: NotFoundComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
