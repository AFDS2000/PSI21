import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTeamComponent } from './components/create-team/create-team.component';
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
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { TaskComponent } from './components/task/task.component';
import { CriarProjetoComponent } from './components/criar-projeto/criar-projeto.component';
import { ListaProjetosComponent } from './components/lista-projetos/lista-projetos.component';

import { ProjetosComponent } from './components/projetos/projetos.component';
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
    ListaProjetosComponent,
    ProjetosComponent,
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
    MatCommonModule
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
      },
      {
        provide: MAT_DATE_LOCALE, 
        useValue: 'en-GB'
    }
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
