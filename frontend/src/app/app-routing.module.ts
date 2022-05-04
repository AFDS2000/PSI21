import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TaskComponent } from './components/task/task.component';
import { TeamComponent } from './components/team/team.component';
import { TeamsComponent } from './components/teams/teams.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'tasks', component: TaskComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
