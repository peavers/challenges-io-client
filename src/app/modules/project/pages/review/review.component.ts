import { Component, Inject, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { Author, Challenge, CodeFile, Feedback } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../../../../shared/component/feedback-dialog/feedback-dialog.component';
import { AuthService, User } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  challenge: Challenge;
  codeFileObservable: Observable<CodeFile[]> = new Observable<CodeFile[]>();

  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private clipboardService: ClipboardService,
    private codeFileService: CodeFileService,
    private pageScrollService: PageScrollService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.challengeService.findById(params['id']).subscribe(challenge => {
        this.challenge = challenge;
      });

      this.codeFileObservable = this.codeFileService.findAllByProjectId(params['id']);
    });

    this.user = this.authService.getUser();
  }

  deleteChallenge(challenge: Challenge) {
    this.challengeService.delete(challenge);
  }

  copyToClip(url: string) {
    this.clipboardService.copyFromContent(url);

    this.snackBar.open(`Copied ${url}`, null, {
      duration: 5 * 1000
    });
  }

  feedback() {
    let author: Author = {
      avatarUrl: this.user.photoURL,
      name: this.user.displayName,
      email: this.user.email
    };

    let feedback: Feedback = {
      author: author
    };

    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '60vw',
      data: [feedback, this.challenge, this.user]
    });

    dialogRef.afterClosed().subscribe((response: Feedback) => {
      if (response) {
        this.challenge.feedback.push(response);

        this.challengeService.update(this.challenge);
      }
    });
  }

  countComments(codeFile: CodeFile) {
    let comments = 0;

    codeFile.codeLines.forEach(codeLine => {
      comments = comments + codeLine.comments.length;
    });

    if (comments == 0) {
      return false;
    }

    return comments;
  }
}

