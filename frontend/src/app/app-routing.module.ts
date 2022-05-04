import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';

import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'criarEquipa', component: CreateTeamComponent},
    { path: 'criarUtilizador', component: SignupComponent, canActivate: [AuthGuardService, AdminGuardService] },
    { path: 'tasks', component: TaskComponent,canActivate: [AuthGuardService] },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
