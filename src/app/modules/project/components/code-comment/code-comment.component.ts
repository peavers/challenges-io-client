import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment, FirestoreUser} from '../../../../core/domain/modules';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-code-comment-component',
  templateUrl: './code-comment.component.html',
  styleUrls: ['./code-comment.component.scss']
})
export class CodeCommentComponent implements OnInit {
  @Input()
  comment: Comment;

  user: FirestoreUser;

  constructor(private authService: AuthService) {
    this.user = authService.getUser();
  }

  ngOnInit() {
  }

  deleteComment() {
  }
}
