import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Challenge, Feedback } from '../../../core/domain/modules';
import { User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  feedback: Feedback;

  challenge: Challenge;

  user: User;

  constructor(private _ngZone: NgZone, @Inject(MAT_DIALOG_DATA) public data: [Feedback, Challenge, User]) {
    this.feedback = data[0];
    this.challenge = data[1];
    this.user = data[2];
  }
}
