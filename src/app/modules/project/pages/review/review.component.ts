import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge, CodeFile, Comment } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  challenge: Challenge;

  uniqueComments: Observable<Comment[]> = new Observable<Comment[]>();

  tableOfContent: CodeFile[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageScrollService: PageScrollService,
    private authService: AuthService,
    private codeFileService: CodeFileService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.challenge = data['data']['challenge'];
      this.tableOfContent = data['data']['toc'];
    });

    this.authService.getUser();
  }

  uniqueCommentAuthor() {
    this.tableOfContent.forEach(c => {
      this.codeFileService.getFileUniqueReviewers(this.challenge.id, c.id);
    });
  }

}
