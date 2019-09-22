import { Component, Input, OnInit } from '@angular/core';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { Comment } from '../../../../core/domain/modules';
import { MdEditorOption } from 'ngx-markdown-editor';

@Component({
  selector: 'app-code-comment-component',
  templateUrl: './code-comment.component.html',
  styleUrls: ['./code-comment.component.scss']
})
export class CodeCommentComponent implements OnInit {

  @Input()
  comment: Comment;
  options: MdEditorOption = {
    showPreviewPanel: false,
    showBorder: false,
    hideIcons: ['FullScreen'],
    usingFontAwesome5: true,
    scrollPastEnd: 0,
    enablePreviewContentClick: false,
    resizable: false
  };

  constructor(private codeFileService: CodeFileService) {
  }

  ngOnInit() {
  }

  preRenderFunc() {
    let content = this.comment.body;

    console.log(content);

    return content;
  }


}
