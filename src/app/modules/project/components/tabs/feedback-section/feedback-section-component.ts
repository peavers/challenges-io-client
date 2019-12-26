import { Component, Inject, Input, OnInit } from '@angular/core';
import { Challenge, Feedback } from '../../../../../core/domain/modules';
import { AuthService } from '../../../../../core/services/auth.service';
import { ChallengeService } from '../../../../../core/services/challenge.service';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackDialogComponent } from '../../../../../shared/component/dialogs/feedback-dialog/feedback-dialog.component';
import {
  DIALOG_WIDTH,
  SNACKBOX_MESSAGE_FAILURE,
  SNACKBOX_MESSAGE_SUCCESS,
  SNACKBOX_PERMISSION_DENIED
} from '../../../../../core/constants';

@Component({
  selector: 'app-feedback-section-component',
  templateUrl: './feedback-section-component.html',
  styleUrls: ['./feedback-section-component.scss']
})
export class FeedbackSectionComponent implements OnInit {
  @Input()
  challenge: Challenge;

  currentUserFeedback: Feedback;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Add Feedback',
    spinnerSize: 19,
    raised: true,
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

  ngOnInit(): void {
    this.btnOpts.disabled = this.challenge.feedback.some(
      feedback => feedback.firebaseUser.uid === this.authService.getUser().uid
    );

    this.currentUserFeedback = this.challenge.feedback.find(
      feedback => feedback.firebaseUser.uid === this.authService.getUser().uid
    );
  }

  saveFeedback() {
    this.btnOpts.active = true;

    this.challengeService.update(this.challenge).subscribe(
      () => {
        this.btnOpts.active = false;
        this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS);
      },
      () => {
        this.btnOpts.active = false;
        this.snackBar.open(SNACKBOX_MESSAGE_FAILURE);
      }
    );
  }

  addFeedback() {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: DIALOG_WIDTH,
      data: {}
    });

    dialogRef.afterClosed().subscribe((feedback: Feedback) => {
      if (feedback) {
        feedback.firebaseUser = this.authService.getUser();
        this.challenge.feedback.push(feedback);
        this.currentUserFeedback = feedback;
        this.saveFeedback();
      }
    });
  }

  editFeedback(feedback: Feedback) {
    if (this.challenge.underReview || feedback.firebaseUser.uid === this.authService.getUser().uid) {
      const dialogRef = this.dialog.open(FeedbackDialogComponent, {
        width: DIALOG_WIDTH,
        data: feedback
      });

      dialogRef.afterClosed().subscribe((editedFeedback: Feedback) => {
        if (editedFeedback) {
          const feedbackItems: Feedback[] = this.challenge.feedback;

          feedbackItems.forEach((item, index) => {
            if (item.firebaseUser.uid === editedFeedback.firebaseUser.uid) {
              feedbackItems[index] = editedFeedback;
            }
          });

          this.challenge.feedback = feedbackItems;

          this.saveFeedback();
        }
      });
    } else {
      this.snackBar.open(SNACKBOX_PERMISSION_DENIED);
    }
  }
}
