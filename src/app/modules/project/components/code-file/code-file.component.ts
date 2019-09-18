import { Component, Input, OnInit } from '@angular/core';
import { CodeFile } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';

@Component({
  selector: 'app-code-file-component',
  templateUrl: './code-file.component.html',
  styleUrls: ['./code-file.component.scss']
})
export class CodeFileComponent implements OnInit {
  @Input()
  codeFile: CodeFile;

  constructor(private codeFileService: CodeFileService) {
  }

  ngOnInit() {
  }

  saveComment($event) {
    this.codeFile.codeLines[$event.id].comments = $event.comments;
    this.codeFileService.update(this.codeFile);
  }

}
