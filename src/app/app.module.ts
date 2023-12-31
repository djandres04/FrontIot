import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LostpasswordComponent } from './components/lostpassword/lostpassword.component';
import { RegisterComponent } from './components/register/register.component';
import { LightComponent } from './components/dashboard/light/light.component';
import { DoorComponent } from './components/dashboard/door/door.component';
import { BuzzerComponent } from './components/dashboard/buzzer/buzzer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MenuModule} from "primeng/menu";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LoginComponent,
    LostpasswordComponent,
    RegisterComponent,
    LightComponent,
    DoorComponent,
    BuzzerComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    RippleModule,
    ToastModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
