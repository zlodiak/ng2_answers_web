import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions/questions/questions.component';
import { QuestionCreateComponent } from './questions/question-create/question-create.component';
import { QuestionComponent } from './questions/question/question.component';
import { TagsComponent } from './tags/tags/tags.component';
import { TagQuestionsComponent } from './tags/tag-questions/tag-questions.component';
import { UsersComponent } from './users/users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AuthUserGuardService } from './shared/services/auth-user-guard.service';


const routes: Routes = [
	{path: 'questions', component: QuestionsComponent},
	{path: 'question-create', component: QuestionCreateComponent, canActivate: [AuthUserGuardService]},
	{path: 'question/:id', component: QuestionComponent},
	{path: 'tags', component: TagsComponent},
	{path: 'tag-questions/:tag_id', component: TagQuestionsComponent},
	{path: 'users', component: UsersComponent},
	{path: 'user/:user_id', component: UserComponent},
	{path: 'user-edit', component: UserEditComponent, canActivate: [AuthUserGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
