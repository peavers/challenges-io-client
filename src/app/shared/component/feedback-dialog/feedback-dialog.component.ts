import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Feedback } from '../../../core/domain/modules';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  nextStages: string[] = ['Yes', 'No'];

  levels: string[] = ['Intern', 'Junior', 'Intermediate', 'Senior'];

  feedback: Feedback;

  constructor(
    private _ngZone: NgZone,
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback
  ) {
    this.feedback = data;
  }

  submit() {
    this.dialogRef.close(this.feedback);
  }
}
