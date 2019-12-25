import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Challenge, CodeFile, CodeLine } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBOX_DISPLAY_TIME, SNACKBOX_MESSAGE_FAILURE, SNACKBOX_MESSAGE_SUCCESS } from '../../../../core/constants';

@Component({
  selector: 'app-code-line-component',
  templateUrl: './code-line.component.html',
  styleUrls: ['./code-line.component.scss']
})
export class CodeLineComponent implements OnInit {
  @Input()
  codeFile: CodeFile;

  @Input()
  challenge: Challenge;

  @Input()
  codeLine: CodeLine;

  @Input()
  lineNumber: number;

  showReplyBox: boolean;

  showCommentBox: boolean;

  replyContent: string;

  constructor(
    private authService: AuthService,
    private codeFileService: CodeFileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  showCommentOrReplyBox() {
    if (this.codeLine.comments.length >= 1) {
      this.showReplyBox = !this.showReplyBox;
    } else {
      this.showCommentBox = !this.showCommentBox;
    }
  }

  addNewComment(editorContent) {
    this.codeLine.comments.push({
      firebaseUser: this.authService.getUser(),
      body: editorContent
    });

    this.codeFileService.update(this.codeFile).subscribe(
      result => {
        this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS, null, {
          duration: SNACKBOX_DISPLAY_TIME
        });

        this.replyContent = '';
        this.showReplyBox = false;
        this.showCommentBox = false;
      },
      error => {
        this.snackBar.open(SNACKBOX_MESSAGE_FAILURE, null, {
          duration: SNACKBOX_DISPLAY_TIME
        });
      }
    );
  }

  deleteComment($event) {
    this.codeLine.comments = this.codeLine.comments.filter(x => x.firebaseUser.uid !== $event.id);
  }

  showBackground(): boolean {
    if (this.codeLine.comments.length >= 1) {
      return true;
    } else {
      return this.showReplyBox ? true : this.showCommentBox;
    }
  }
}
