import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TaskComponent } from './components/task/task.component';
import { CriarProjetoComponent } from './components/criar-projeto/criar-projeto.component';
import { HomeComponent } from './components/home/home.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { ConsultarEquipasComponent } from './components/consultar-equipas/consultar-equipas.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { ShowTeamsComponent } from './components/show-teams/show-teams.component';
import { ListaProjetosComponent } from './components/lista-projetos/lista-projetos.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component'

import { AuthInterceptorService } from './services/auth-interceptor.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        SidenavComponent,
        SignupComponent,
        LoginComponent,
        CreateTeamComponent,
        CriarProjetoComponent,
        TaskComponent,
        HomeComponent,
        MyTasksComponent,
        ConsultarEquipasComponent,
        TeamDetailComponent,
        ShowTeamsComponent,
        ListaProjetosComponent,
        ProjetosComponent,
        TaskManagerComponent
    ],
    imports: [
        MatListModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatCommonModule,
        MatTableModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,

        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'en-GB'
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
