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
  SNACKBOX_DISPLAY_TIME,
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

  currentFeedback: Feedback;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Add feedback',
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
  ) {}

  saveFeedback() {
    this.btnOpts.active = true;

    this.challengeService.update(this.challenge).subscribe(
      result => {
        this.btnOpts.active = false;

        this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS, null, {
          duration: SNACKBOX_DISPLAY_TIME
        });
      },
      error => {
        this.btnOpts.active = false;

        this.snackBar.open(SNACKBOX_MESSAGE_FAILURE, null, {
          duration: SNACKBOX_DISPLAY_TIME
        });
      }
    );
  }

  addFeedback() {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: DIALOG_WIDTH,
      data: {}
    });

    dialogRef.afterClosed().subscribe((newFeedback: Feedback) => {
      if (newFeedback) {
        newFeedback.firebaseUser = this.authService.getUser();

        this.challenge.feedback.push(newFeedback);

        this.saveFeedback();
      }
    });
  }

  editFeedback(feedback: Feedback) {
    if (feedback.firebaseUser.uid != this.authService.getUser().uid) {
      this.snackBar.open(SNACKBOX_PERMISSION_DENIED, null, {
        duration: SNACKBOX_DISPLAY_TIME
      });
    } else {
      const dialogRef = this.dialog.open(FeedbackDialogComponent, {
        width: DIALOG_WIDTH,
        data: feedback
      });

      dialogRef.afterClosed().subscribe((editedFeedback: Feedback) => {
        if (editedFeedback) {
          let items: Feedback[] = this.challenge.feedback;

          items.forEach((feedback, index) => {
            if (feedback.firebaseUser.uid === editedFeedback.firebaseUser.uid) {
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
    this.btnOpts.disabled = this.challenge.feedback.some(
      feedback => feedback.firebaseUser.uid === this.authService.getUser().uid
    );

    this.currentFeedback = this.challenge.feedback.find(
      feedback => feedback.firebaseUser.uid === this.authService.getUser().uid
    );
  }
}
