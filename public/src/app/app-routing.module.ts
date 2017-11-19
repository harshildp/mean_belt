import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { NewComponent } from './new/new.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'new_question', component: NewComponent},  
  { path: 'questions/:qid', component: QuestionComponent},
  { path: 'questions/:qid/new_answer', component:AnswerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
