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

  hasComments: boolean = true;

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

    if (this.codeLine.comments === undefined || this.codeLine.comments.length == 0) {
      this.hasComments = false;
    }
  }

  triggerCommentBox() {
    this.commentBox = !this.commentBox;
  }

  comment($event) {

    console.log($event);

    const user = this.authService.getUser();

    let author: Author = {
      avatarUrl: user.photoURL,
      name: user.displayName,
      email: user.email
    };

    let comment: Comment = {
      author: author,
      body: $event,
      lineNumber: this.lineNumber + 1
    };

    //add the comment to the line
    this.codeLine.comments.push(comment);

    // emit the changed code line
    this.codeLineChange.emit(this.codeLine);

    this.reviewThreadReplyBox = false;
    this.commentBox = false;
  }

  reviewThreadReply() {
    return this.reviewThreadReplyBox = !this.reviewThreadReplyBox;
  }

}
