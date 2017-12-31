import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Question } from '../../shared/interfaces/question';
import { QuestionsService } from '../../shared/services/questions.service';
import { GlobalVarsService } from '../../../shared/services/global-vars.service';
import { TagsService } from '../../shared/services/tags.service';


@Component({
  selector: 'aw-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit, OnDestroy {

  private form: FormGroup;
  private subCreateQuestion: Subscription;
  private tags: string[] = [];

  constructor(private questionsService: QuestionsService,
              private router: Router,
              private globalVarsService: GlobalVarsService,
              private tagsService: TagsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title':      new FormControl('', [Validators.required, Validators.minLength(1)]),
      'question':   new FormControl('', [Validators.required, Validators.minLength(3)]),
      'tag':        new FormControl()
    });
  }

  ngOnDestroy() {
    if(this.subCreateQuestion) { this.subCreateQuestion.unsubscribe(); }
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
      createdDateUnix: '' + Date.now()
    };

    this.subCreateQuestion = this.questionsService.createQuestion(question).subscribe((resp) => {
      this.router.navigate(['/question/' + resp.id], {queryParams: {
        questionCreateNow: true
      }});
    });
  }

  private onSubmit(): void {
    const tagsIds: number[] = [];
    const newTags: string[] = [];
    const storagedTags: string[] = [];

    this.tagsService.getTags().subscribe((tags) => {
      this.tags.forEach((newTag) => {
        let isExist = false;

        tags.forEach((oldTagObj) => {
          if(oldTagObj.title === newTag) {
            isExist = true;
            storagedTags.push(oldTagObj.id);
          }
        });

        if(!isExist) { newTags.push(newTag); }
      });

      newTags.forEach((tag) => {
        const tagObj = {title: tag};
        this.tagsService.createTag(tagObj).subscribe((obj) => {
          tagsIds.push(obj.id);
        });
      });

      setTimeout(() => {
        const allTagsIds = tagsIds.concat(storagedTags);
        // console.log(tagsIds, storagedTags, allTagsIds);
        this.createQuestion(allTagsIds);
      }, 1000);

    });
  }

  private addTag(event, tag): void {
    if(!tag.trim().length) { return; }

    this.form.patchValue({tag: ''});

    if(this.tags.indexOf(tag) === -1) {
      this.tags.push(tag.trim());
    }
  }

  private deleteTag(tag): void {
    this.tags = this.tags.filter(t => t != tag);
  }

}
