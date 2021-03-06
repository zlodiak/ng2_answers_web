import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

import { QuestionsService } from './shared/services/questions.service';
import { TagsService } from './shared/services/tags.service';
import { AnswersService } from './shared/services/answers.service';
import { CommentsService } from './shared/services/comments.service';
import { AuthUserGuardService } from './shared/services/auth-user-guard.service';

import { SystemComponent } from './system.component';
import { QuestionsComponent } from './questions/questions/questions.component';
import { QuestionCreateComponent } from './questions/question-create/question-create.component';
import { QuestionComponent } from './questions/question/question.component';
import { TagsComponent } from './tags/tags/tags.component';
import { TagQuestionsComponent } from './tags/tag-questions/tag-questions.component';
import { UsersComponent } from './users/users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { QuestionBodyComponent } from './questions/question/question-body/question-body.component';
import { AnswersListComponent } from './questions/question/answers-list/answers-list.component';
import { AnswerFormComponent } from './questions/question/answer-form/answer-form.component';
import { QuestionCommentsComponent } from './questions/question/question-body/question-comments/question-comments.component';
import { AnswerCommentsComponent } from './questions/question/answers-list/answer-comments/answer-comments.component';
import { QuestionRatingComponent } from './questions/question/question-body/question-rating/question-rating.component';
import { AnswerRatingComponent } from './questions/question/answers-list/answer-rating/answer-rating.component';


@NgModule({
	imports: [
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		CommonModule,
		SystemRoutingModule
	],
	declarations: [
		SystemComponent,
		QuestionsComponent,
		QuestionCreateComponent,
		QuestionComponent,
		TagsComponent,
		TagQuestionsComponent,
		UsersComponent,
		UserComponent,
		UserEditComponent,
		QuestionBodyComponent,
		AnswersListComponent,
		AnswerFormComponent,
		QuestionCommentsComponent,
		AnswerCommentsComponent,
		QuestionRatingComponent,
		AnswerRatingComponent
	],
	providers: [
		AuthUserGuardService,
		CommentsService,
    AnswersService,
    TagsService,
		QuestionsService
	]
})
export class SystemModule{}