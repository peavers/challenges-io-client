import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CodeFile, CodeLine, Comment, FirestoreUser} from '../../../../core/domain/modules';
import {AuthService} from '../../../../core/services/auth.service';
import {SNACKBOX_MESSAGE_FAILURE, SNACKBOX_MESSAGE_SUCCESS} from '../../../../core/constants';
import {CodeFileService} from '../../../../core/services/code-file.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-comment-component',
  templateUrl: './code-comment.component.html',
  styleUrls: ['./code-comment.component.scss']
})
export class CodeCommentComponent implements OnInit {
  @Input()
  codeFile: CodeFile;

  @Input()
  codeLine: CodeLine;

  @Input()
  comment: Comment;

  user: FirestoreUser;

  constructor(
    private authService: AuthService,
    private codeFileService: CodeFileService,
    private snackBar: MatSnackBar
  ) {
    this.user = authService.getUser();
  }

  ngOnInit() {
  }

  deleteComment() {
    this.codeLine.comments = this.codeLine.comments.filter(item => item.id !== this.comment.id);

    this.codeFileService.update(this.codeFile).subscribe(
      () => {
        this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS);
      },
      () => {
        this.snackBar.open(SNACKBOX_MESSAGE_FAILURE);
      }
    );
  }
}
