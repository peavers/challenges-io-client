import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Author, CodeLine, Comment } from '../../../../core/domain/modules';
import { Utils } from '../../../../shared/helper/utils';

@Component({
  selector: 'app-code-line-component',
  templateUrl: './code-line.component.html',
  styleUrls: ['./code-line.component.scss']
})
export class CodeLineComponent implements OnInit {
  @Output()
  codeLineChange = new EventEmitter();

  @Input()
  codeLine: CodeLine;

  @Input()
  lineNumber: number;

  showReplyBox: boolean;

  showCommentBox: boolean;

  replyContent: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  showCommentOrReplyBox() {
    if (this.codeLine.comments.length >= 1) {
      this.showReplyBox = !this.showReplyBox;
    } else {
      this.showCommentBox = !this.showCommentBox;
    }
  }

  addNewComment($event) {
    const user = this.authService.getUser();

    let author: Author = {
      avatarUrl: user.photoURL,
      name: user.displayName,
      email: user.email
    };

    let comment: Comment = {
      id: Utils.generateUUID(),
      author: author,
      body: $event,
      lineNumber: this.lineNumber + 1
    };

    this.codeLine.comments.push(comment);
    this.codeLineChange.emit(this.codeLine);

    this.replyContent = '';
    this.showReplyBox = false;
    this.showCommentBox = false;
  }

  deleteComment($event) {
    this.codeLine.comments = this.codeLine.comments.filter(x => x.id !== $event.id);

    this.codeLineChange.emit(this.codeLine);
  }

  showRedBackground(): boolean {
    return this.codeLine.comments.length >= 1 ? true : this.showReplyBox ? true : this.showCommentBox;
  }
}
