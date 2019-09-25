import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService, User } from '../../../../core/services/auth.service';
import { MdEditorOption } from 'ngx-markdown-editor';

@Component({
  selector: 'app-wysiwyg-component',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss']
})
export class WysiwygEditorComponent {
  @Output()
  editorContentChange = new EventEmitter();

  @Output()
  cancelEvent = new EventEmitter();

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

  save() {
    this.editorContentChange.emit(this.editorContent);

    this.editorContent = '';
  }

  cancel() {
    this.cancelEvent.emit(false);

    this.editorContent = '';
  }
}
