import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Feedback } from '../../../../core/domain/modules';
import { POSITION_LEVEL, YES_NO } from '../../../../core/constants';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  nextStages: string[] = YES_NO;

  levels: string[] = POSITION_LEVEL;

  feedback: Feedback;

  constructor(
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Feedback
  ) {
    this.feedback = data;
  }

  submit() {
    this.dialogRef.close(this.feedback);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
