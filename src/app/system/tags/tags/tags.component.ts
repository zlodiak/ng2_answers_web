import { Component, OnInit } from '@angular/core';

import { TagsService } from '../../shared/services/tags.service';
import { Tag } from '../../shared/interfaces/tag';


@Component({
  selector: 'aw-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  private tags: Tag[];

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.tagsService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
  }

}
