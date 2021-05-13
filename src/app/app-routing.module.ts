import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChannelComponent} from './channel/channel.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'channel', component: ChannelComponent},
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
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
