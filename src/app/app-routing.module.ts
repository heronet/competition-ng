import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { ParticipantsComponent } from './competitions/participants/participants.component';

const routes: Routes = [
  {path: '', redirectTo: 'competitions', pathMatch: "full"},
  {path: 'competitions', component: CompetitionsComponent},
  {path: 'competitions/:id', component: ParticipantsComponent},
  {path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
