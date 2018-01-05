import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { Question } from '../../shared/interfaces/question';
import { InfoDialogComponent } from '../../../shared/dialogs/info-dialog/info-dialog.component';

import { QuestionsService } from '../../shared/services/questions.service';
import { GlobalVarsService } from '../../../shared/services/global-vars.service';
import { TagsService } from '../../shared/services/tags.service';
import { User } from '../../../shared/interfaces/user';


@Component({
  selector: 'aw-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private tags: string[] = [];
  private authorizedUser: User;

  private subCreateQuestion: Subscription;
  private subCreateTag: Subscription;
  private subGetTags: Subscription;

  constructor(private matDialog: MatDialog,
              private questionsService: QuestionsService,
              private router: Router,
              private globalVarsService: GlobalVarsService,
              private tagsService: TagsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title':      new FormControl('', [Validators.required, Validators.minLength(1)]),
      'question':   new FormControl('', [Validators.required, Validators.minLength(3)]),
      'tag':        new FormControl()
    });

    this.authorizedUser = this.globalVarsService.getAuthorizedUser_();
  }

  ngOnDestroy() {
    if(this.subCreateQuestion) { this.subCreateQuestion.unsubscribe(); }
    if(this.subCreateTag) { this.subCreateTag.unsubscribe(); }
    if(this.subGetTags) { this.subGetTags.unsubscribe(); }
  }

  private createQuestion(tagsIds: number[]): void {
    const authorizedUser = this.globalVarsService.getAuthorizedUser_();

    if(!authorizedUser) { return; }

    // id is autoincrement
    const question: Question = {
      author: authorizedUser.id,
      isDecided: false,
      isDeleted: false,
      tags: tagsIds,
      title: this.form.value.title,
      body: this.form.value.question,
      ratingPlus: [],
      ratingMinus: [],
      createdDateUnix: '' + (Date.now() / 1000)
    };

    this.subCreateQuestion = this.questionsService.createQuestion(question).subscribe((resp) => {
      this.router.navigate(['/question/' + resp.id], {queryParams: {
        questionCreateNow: true
      }});

      this.globalVarsService.setVar('isLoading', false);

      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: {title: 'Выполнено', message: 'Вопрос создан'}
      });
    });
  }

  private onSubmit(): void {
    this.globalVarsService.setVar('isLoading', true);

    const tagsIds: number[] = [];
    const newTags: string[] = [];
    const storagedTagsIds: number[] = [];

    this.subGetTags = this.tagsService.getTags().subscribe((tags) => {
      this.tags.forEach((newTag) => {
        let isExist = false;

        tags.forEach((oldTagObj) => {
          if(oldTagObj.title === newTag) {
            isExist = true;
            storagedTagsIds.push(oldTagObj.id);
          }
        });

        if(!isExist) { newTags.push(newTag); }
      });

      newTags.forEach((tag) => {
        const tagObj = {title: tag};
        this.subCreateTag = this.tagsService.createTag(tagObj).subscribe((obj) => {
          tagsIds.push(obj.id);
        });
      });

      setTimeout(() => {
        const allTagsIds = tagsIds.concat(storagedTagsIds);
        this.createQuestion(allTagsIds);
      }, 2000);

    });
  }

  private addTag(tag, ev): void | boolean{
    if(!tag.trim().length) { return; }

    this.form.patchValue({tag: ''});

    if(this.tags.indexOf(tag) === -1) {
      this.tags.push(tag.trim());
    }

    if(ev.keyCode === 13) { return false; }
  }

  private deleteTag(tag): void {
    this.tags = this.tags.filter(t => t != tag);
  }

}
