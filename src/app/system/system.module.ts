import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';

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


@NgModule({
	imports: [
		CommonModule,
		SystemRoutingModule
	],
	declarations: [
		SystemComponent,
		QuestionsComponent,
		QuestionCreateComponent,
		QuestionEditComponent,
		QuestionComponent,
		TagsComponent,
		TagQuestionsComponent,
		UsersComponent,
		UserComponent,
		UserEditComponent
	],
	providers: [

	]
})
export class SystemModule{}