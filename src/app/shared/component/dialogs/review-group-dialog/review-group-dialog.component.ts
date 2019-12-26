import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreUser } from '../../../../core/domain/modules';
import { REVIEW_GROUP } from '../../../../core/constants';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './review-group-dialog.component.html',
  styleUrls: ['./review-group-dialog.component.scss']
})
export class ReviewGroupDialogComponent {
  readonly reviewGroups: string[] = REVIEW_GROUP;

  reviewer: FirestoreUser;

  constructor(
    private dialogRef: MatDialogRef<ReviewGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: FirestoreUser
  ) {
    this.reviewer = data;
  }

  submit() {
    this.dialogRef.close(this.reviewer);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
