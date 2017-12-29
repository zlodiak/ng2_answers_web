import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagQuestionsComponent } from './tag-questions.component';

describe('TagQuestionsComponent', () => {
  let component: TagQuestionsComponent;
  let fixture: ComponentFixture<TagQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
