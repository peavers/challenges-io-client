import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Challenge, CodeFile, CodeLine, Comment } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBOX_DISPLAY_TIME, SNACKBOX_MESSAGE_SUCCESS } from '../../../../core/constants';
import { CommentService } from '../../../../core/services/comment.service';

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
    private commentService: CommentService,
    private authService: AuthService,
    private codeFileService: CodeFileService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  showCommentOrReplyBox() {
    if (this.codeLine.comments.length >= 1) {
      this.showReplyBox = !this.showReplyBox;
    } else {
      this.showCommentBox = !this.showCommentBox;
    }
  }

  addNewComment(editorContent) {
    const comment: Comment = {
      firebaseUser: this.authService.getUser(),
      body: editorContent,
      codeLineId: this.codeLine.id
    };

    this.replyContent = '';
    this.showReplyBox = false;
    this.showCommentBox = false;

    this.commentService.save(comment).subscribe(
      result => {
        this.codeLine.comments.push(comment);

        this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS);
      },
      error => {
        this.snackBar.open(error, null, {
          duration: SNACKBOX_DISPLAY_TIME * 100
        });
      }
    );
  }

  showBackground(): boolean {
    if (this.codeLine.comments.length >= 1) {
      return true;
    } else {
      return this.showReplyBox ? true : this.showCommentBox;
    }
  }
}
