import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import { QuestionsComponent } from './questions/questions/questions.component';
import { QuestionCreateComponent } from './questions/question-create/question-create.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { QuestionComponent } from './questions/question/question.component';
import { TagsComponent } from './tags/tags/tags.component';
import { TagQuestionsComponent } from './tags/tag-questions/tag-questions.component';
import { UsersComponent } from './users/users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';


const routes: Routes = [
	{path: 'questions', component: QuestionsComponent},
	{path: 'question-create', component: QuestionCreateComponent},
	{path: 'question-edit', component: QuestionEditComponent},
	{path: 'question/:id', component: QuestionComponent},
	{path: 'questions', component: TagsComponent},
	{path: 'tags', component: QuestionsComponent},
	{path: 'tag-questions', component: TagQuestionsComponent},
	{path: 'users', component: UsersComponent},
	{path: 'user', component: UserComponent},
	{path: 'user-edit', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
