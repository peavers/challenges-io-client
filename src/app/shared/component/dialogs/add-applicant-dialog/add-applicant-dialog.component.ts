import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Challenge, Reviewer } from '../../../../core/domain/modules';
import { Observable } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  POSITION_LEVEL,
  POSITIONS,
  REVIEW_GROUP,
  SNACKBOX_LOADING,
  SNACKBOX_MESSAGE_FAILURE,
  SNACKBOX_MESSAGE_SUCCESS
} from '../../../../core/constants';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './add-applicant-dialog.component.html',
  styleUrls: ['./add-applicant-dialog.component.scss']
})
export class AddApplicantDialogComponent {
  readonly reviewGroups: string[] = REVIEW_GROUP;

  readonly levels: string[] = POSITION_LEVEL;

  readonly positions: string[] = POSITIONS;

  reviewers: Observable<Reviewer[]> = new Observable<Reviewer[]>();

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Import',
    spinnerSize: 19,
    raised: false,
    stroked: false,
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  challenge: Challenge = {};

  constructor(
    private challengeService: ChallengeService,
    private firestoreService: FirestoreService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddApplicantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reviewer
  ) {
    this.reviewers = this.firestoreService.findAll();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  import() {
    this.dialogRef.close();
    this.snackBar.open(SNACKBOX_LOADING);
    this.btnOpts.active = true;

    this.challengeService.create(this.challenge).subscribe(
      () => {
        this.btnOpts.active = false;
        this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS);

        this.challenge = {};
      },
      () => {
        this.btnOpts.active = false;
        this.snackBar.open(SNACKBOX_MESSAGE_FAILURE);
      }
    );
  }
}
