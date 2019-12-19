import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reviewer } from '../../../core/domain/modules';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './new-reviewer-dialog.component.html',
  styleUrls: ['./new-reviewer-dialog.component.scss']
})
export class NewReviewerDialogComponent {

  readonly roles: string[] = ['User', 'Admin'];

  reviewer: Reviewer;

  constructor(
    private _ngZone: NgZone,
    private dialogRef: MatDialogRef<NewReviewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reviewer
  ) {
    this.reviewer = data;
  }

  submit() {
    this.dialogRef.close(this.reviewer);
  }
}
