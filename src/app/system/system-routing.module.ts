import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions/questions.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
	{path: 'questions', component: QuestionsComponent},
	{path: 'tags', component: TagsComponent},
	{path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
