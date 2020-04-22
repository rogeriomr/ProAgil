import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { ContatosComponent } from './contatos/contatos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventosComponent } from './eventos/eventos.component';
import { LoginComponent } from './user/login/login.component';
import { NavComponent } from './nav/nav.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { RegisterComponent } from './user/register/register.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { UserComponent } from './user/user.component';

import { AuthInterceptor } from './auth/auth.interceptor';
import { DateTimeFormatPipePipe } from './_helpers/DateTimeFormatPipe.pipe';


@NgModule({
   declarations: [
      AppComponent,
      ContatosComponent,
      DashboardComponent,
      DateTimeFormatPipePipe,
      EventosComponent,
      LoginComponent,
      NavComponent,
      PalestrantesComponent,
      RegisterComponent,
      TituloComponent,
      UserComponent
   ],
   imports: [
      AppRoutingModule,
      BrowserModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      CommonModule,
      FormsModule,
      HttpClientModule,
      ModalModule.forRoot(),
      ReactiveFormsModule,
      ToastrModule.forRoot({
         timeOut: 3000,
         progressBar: true,
         preventDuplicates: true,
       }),
      TooltipModule.forRoot(),
   ],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
