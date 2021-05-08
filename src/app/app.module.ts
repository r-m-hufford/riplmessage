import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChannelComponent } from './channel/channel.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ChannelService} from './channel.service';
import {RouterModule} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    ChannelComponent,
    ForgotPasswordComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: 'channel/:id',
        component: ChannelComponent
      },
      {
        path: 'channel',
        component: ChannelComponent
      }
    ])
  ],
  providers: [ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
