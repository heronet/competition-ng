import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { ParticipantsComponent } from './competitions/participants/participants.component';
import { LoginGuard } from './guards/login.guard';
import { SecurityGuard } from './guards/security.guard';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { StudentsComponent } from './students/students.component';


const routes: Routes = [
  {path: '', redirectTo: 'competitions', pathMatch: "full"},
  {path: 'competitions', component: CompetitionsComponent, canActivate: [SecurityGuard]},
  {path: 'competitions/:id', component: ParticipantsComponent, canActivate: [SecurityGuard]},
  {path: 'students', component: StudentsComponent, canActivate: [SecurityGuard]},
  {path: 'students/add-student', component: AddStudentComponent, canActivate: [SecurityGuard]},
  {path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule), canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityGuard, LoginGuard]
})
export class AppRoutingModule { }
