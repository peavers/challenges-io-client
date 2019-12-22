import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreUser } from '../../../core/domain/modules';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './review-group-dialog.component.html',
  styleUrls: ['./review-group-dialog.component.scss']
})
export class ReviewGroupDialogComponent {
  readonly reviewGroups: string[] = ['Frontend', 'Backend', 'Tech Lead'];

  reviewer: FirestoreUser;

  constructor(
    private _ngZone: NgZone,
    private dialogRef: MatDialogRef<ReviewGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FirestoreUser
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
