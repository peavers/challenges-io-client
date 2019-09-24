import { Component, Inject, NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Challenge, Feedback } from '../../../core/domain/modules';
import { User } from '../../../core/services/auth.service';
import { MdEditorOption } from 'ngx-markdown-editor';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  feedback: Feedback;

  challenge: Challenge;

  user: User;
  reviewThreadReplyBox: boolean;

  onNoClick(): void {
    this.dialogRef.close();
  }

  options: MdEditorOption = {
    showPreviewPanel: false,
    showBorder: false,
    hideIcons: ['FullScreen'],
    usingFontAwesome5: true,
    scrollPastEnd: 0,
    enablePreviewContentClick: false,
    resizable: false
  };
  reply: any;

  constructor(
    private _ngZone: NgZone,
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [Feedback, Challenge, User]
  ) {

    this.feedback = data[0];
    this.challenge = data[1];
    this.user = data[2];
  }

  deleteComment($event: any) {

  }

  reviewThreadReply() {

  }

  comment(reply: any) {

  }
}
