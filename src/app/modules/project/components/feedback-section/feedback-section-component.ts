import { Component, Inject, Input, OnInit } from '@angular/core';
import { Challenge, Feedback } from '../../../../core/domain/modules';
import { FeedbackDialogComponent } from '../../../../shared/component/feedback-dialog/feedback-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-section-component',
  templateUrl: './feedback-section-component.html',
  styleUrls: ['./feedback-section-component.scss']
})
export class FeedbackSectionComponent implements OnInit {
  @Input()
  challenge: Challenge;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Leave feedback',
    spinnerSize: 19,
    raised: false,
    stroked: false,
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(
    private authService: AuthService,
    private challengeService: ChallengeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  disableLeaveFeedback(): boolean {
    return this.challenge.feedback.some(feedback => feedback.reviewer.id === this.authService.getUser().uid);
  }

  currentUserFeedback(): Feedback {
    return this.challenge.feedback.find(feedback => feedback.reviewer.id === this.authService.getUser().uid);
  }

  saveFeedback() {
    this.btnOpts.active = true;

    this.challengeService.update(this.challenge).subscribe(
      result => {
        this.btnOpts.active = false;

        this.snackBar.open('Feedback saved', null, {
          duration: 5 * 1000
        });
      },
      error => {
        this.btnOpts.active = false;

        this.snackBar.open('Feedback failed', null, {
          duration: 5 * 1000
        });
      }
    );
  }

  addFeedback() {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '30vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe((newFeedback: Feedback) => {
      if (newFeedback) {
        newFeedback.reviewer = this.authService.getReviewer();

        this.challenge.feedback.push(newFeedback);

        this.saveFeedback();
      }
    });
  }

  editFeedback(feedback: Feedback) {
    if (feedback.reviewer.id != this.authService.getUser().uid) {
      this.snackBar.open('Permission denied', null, {
        duration: 5 * 1000
      });
    } else {
      const dialogRef = this.dialog.open(FeedbackDialogComponent, {
        width: '30vw',
        data: feedback
      });

      dialogRef.afterClosed().subscribe((editedFeedback: Feedback) => {
        if (editedFeedback) {
          let items: Feedback[] = this.challenge.feedback;

          items.forEach((feedback, index) => {
            if (feedback.reviewer.id === editedFeedback.reviewer.id) {
              items[index] = editedFeedback;
            }
          });

          this.challenge.feedback = items;

          this.saveFeedback();
        }
      });
    }
  }

  ngOnInit(): void {
    this.btnOpts.disabled = this.disableLeaveFeedback();
  }
}
