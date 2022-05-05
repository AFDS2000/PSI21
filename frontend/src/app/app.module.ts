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
import { MatCommonModule } from '@angular/material/core';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';

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
        MyTasksComponent
    ],
    imports: [
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
            
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
