import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Author, CodeLine, Comment } from '../../../../core/domain/modules';

@Component({
  selector: 'app-code-line-component',
  templateUrl: './code-line.component.html',
  styleUrls: ['./code-line.component.scss']
})
export class CodeLineComponent implements OnInit {
  @ViewChild('reply', { static: false }) input: ElementRef;

  @Output() valueChange = new EventEmitter();

  @Input()
  codeLine: CodeLine;

  @Input()
  index: number;

  showCommentBox: boolean = false;

  comment: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.codeLine.id = this.index;
  }

  triggerCommentBox() {
    if (this.codeLine.comments.length >= 1) {
      this.input.nativeElement.focus();
    } else {
      this.showCommentBox = !this.showCommentBox;
    }
  }

  save() {
    const user = this.authService.getUser();

    let author: Author = {
      avatarUrl: user.photoURL,
      name: user.displayName,
      email: user.email
    };

    let comment: Comment = {
      author: author,
      body: this.comment
    };

    this.codeLine.comments.push(comment);
    this.valueChange.emit(this.codeLine);

    this.comment = '';
    this.showCommentBox = false;
  }

  editComment(comment: Comment) {
    this.comment = comment.body;
  }

  deleteComment(comment: Comment) {
    this.codeLine.comments = this.codeLine.comments.filter(function(element) {
      return element.id !== comment.id;
    });

    this.valueChange.emit(this.codeLine);
  }
}
