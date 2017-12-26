import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';

import { SystemComponent } from './system.component';
import { QuestionsComponent } from './questions/questions.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';


@NgModule({
	imports: [
		CommonModule,
		SystemRoutingModule
	],
	declarations: [
		SystemComponent,
    QuestionsComponent,
    TagsComponent,
    UsersComponent
	],
	providers: [

	]
})
export class SystemModule{}