import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, User } from '../../../../core/services/auth.service';
import { Author, CodeLine, Comment } from '../../../../core/domain/modules';
import { MdEditorOption } from 'ngx-markdown-editor';

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

  commentBox: boolean = false;

  reviewThreadReplyBox: boolean = false;

  user: User;

  options: MdEditorOption = {
    showPreviewPanel: false,
    showBorder: false,
    hideIcons: ['FullScreen'],
    usingFontAwesome5: true,
    scrollPastEnd: 0,
    enablePreviewContentClick: false,
    resizable: false
  };

  constructor(private authService: AuthService) {
  }

  reply: string;

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  triggerCommentBox() {
    if (this.codeLine.comments.length >= 1) {
      this.reviewThreadReplyBox = !this.reviewThreadReplyBox;
    } else {
      this.commentBox = !this.commentBox;
    }
  }

  generateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  comment($event) {
    const user = this.authService.getUser();

    let author: Author = {
      avatarUrl: user.photoURL,
      name: user.displayName,
      email: user.email
    };

    let comment: Comment = {
      id: this.generateUUID(),
      author: author,
      body: $event,
      lineNumber: this.lineNumber + 1
    };

    //add the comment to the line
    this.codeLine.comments.push(comment);

    // emit the changed code line
    this.codeLineChange.emit(this.codeLine);

    this.reply = '';
    this.reviewThreadReplyBox = false;
    this.commentBox = false;
  }

  reviewThreadReply() {
    return (this.reviewThreadReplyBox = !this.reviewThreadReplyBox);
  }

  deleteComment($event) {
    this.codeLine.comments = this.codeLine.comments.filter(x => x.id !== $event.id);

    this.codeLineChange.emit(this.codeLine);
  }

  showRedBackground(): boolean {
    return this.codeLine.comments.length >= 1
      ? true
      : this.reviewThreadReplyBox
        ? true
        : this.commentBox;
  }
}
