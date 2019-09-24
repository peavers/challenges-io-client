import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, User } from '../../../../core/services/auth.service';
import { MdEditorOption } from 'ngx-markdown-editor';

@Component({
  selector: 'app-wysiwyg-editor-component',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss']
})
export class WysiwygEditorComponent implements OnInit {
  @Output()
  editorContentChange = new EventEmitter();

  @Input()
  show: boolean = false;

  editorContent: string;

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
    this.user = this.authService.getUser();
  }

  ngOnInit() {
  }

  save() {
    this.editorContentChange.emit(this.editorContent);
  }

  hide() {
    this.show = false;
  }
}
