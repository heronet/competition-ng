import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { ParticipantsComponent } from './competitions/participants/participants.component';
import { LoginGuard } from './guards/login.guard';
import { SecurityGuard } from './guards/security.guard';


const routes: Routes = [
  {path: '', redirectTo: 'competitions', pathMatch: "full"},
  {path: 'competitions', component: CompetitionsComponent, canActivate: [SecurityGuard]},
  {path: 'competitions/:id', component: ParticipantsComponent, canActivate: [SecurityGuard]},
  {path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule), canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityGuard, LoginGuard]
})
export class AppRoutingModule { }
