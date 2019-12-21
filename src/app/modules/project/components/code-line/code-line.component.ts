import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {Challenge, CodeLine, Comment} from '../../../../core/domain/modules';
import {Utils} from '../../../../shared/helper/utils';

@Component({
  selector: 'app-code-line-component',
  templateUrl: './code-line.component.html',
  styleUrls: ['./code-line.component.scss']
})
export class CodeLineComponent implements OnInit {

  @Input()
  challenge: Challenge;

  @Output()
  codeLineChange = new EventEmitter();

  @Input()
  codeLine: CodeLine;

  @Input()
  lineNumber: number;

  showReplyBox: boolean;

  showCommentBox: boolean;

  replyContent: string;

  comments: Comment[];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.comments = this.challenge.underReview ? this.codeLine.comments.filter(comment => comment.reviewer.id === this.authService.getUser().uid) : this.codeLine.comments;
  }

  showCommentOrReplyBox() {
    if (this.codeLine.comments.length >= 1) {
      this.showReplyBox = !this.showReplyBox;
    } else {
      this.showCommentBox = !this.showCommentBox;
    }
  }

  addNewComment($event) {
    let comment: Comment = {
      id: Utils.generateUUID(),
      reviewer: this.authService.getReviewer(),
      body: $event,
      lineNumber: this.lineNumber + 1
    };

    if (this.challenge.underReview) {
      this.comments.push(comment);
    }

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

  showBackground(): boolean {
    if (this.comments.length >= 1) {
      return true;
    } else {
      return this.showReplyBox ? true : this.showCommentBox;
    }
  }
}
