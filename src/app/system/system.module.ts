import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

import { QuestionsService } from './shared/services/questions.service';
import { TagsService } from './shared/services/tags.service';

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
import { QuestionBodyComponent } from './questions/question/question-body/question-body.component';
import { AnswersListComponent } from './questions/question/answers-list/answers-list.component';
import { AnswerFormComponent } from './questions/question/answer-form/answer-form.component';


@NgModule({
	imports: [
		SharedModule,
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
		UserEditComponent,
		QuestionBodyComponent,
		AnswersListComponent,
		AnswerFormComponent
	],
	providers: [
    TagsService,
		QuestionsService
	]
})
export class SystemModule{}