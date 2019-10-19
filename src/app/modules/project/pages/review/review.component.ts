import { Component, Inject, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { Author, Challenge, CodeFile, Comment, Feedback } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../../../../shared/component/feedback-dialog/feedback-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  challenge: Challenge;

  tableOfContent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private codeFileService: CodeFileService,
    private pageScrollService: PageScrollService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.challenge = data['data']['challenge'];
      this.tableOfContent = data['data']['toc'];
    });

    this.authService.getUser();
  }

  uniqueCommentAuthor(codeFile: CodeFile): Array<Author> {
    let authors = [];

    if (codeFile.codeLines === undefined) {
      return;
    }

    for (const codeLine of codeFile.codeLines) {
      if (codeLine.comments.length == 0) {
        continue;
      }

      codeLine.comments.forEach((comment: Comment) => {
        authors.push(comment.author);
      });
    }

    return authors.filter((e, i) => authors.findIndex(a => a.email === e.email) === i);
  }
}
