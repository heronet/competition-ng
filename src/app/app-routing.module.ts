import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';

const routes: Routes = [
  {path: '', component: CompetitionsComponent},
  {path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
