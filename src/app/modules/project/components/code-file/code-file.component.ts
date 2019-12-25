import { Component, Input, OnInit } from '@angular/core';
import { Challenge, CodeFile } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-code-file-component',
  templateUrl: './code-file.component.html',
  styleUrls: ['./code-file.component.scss']
})
export class CodeFileComponent implements OnInit {
  @Input()
  challenge: Challenge;

  @Input()
  codeFile: CodeFile;

  constructor(private codeFileService: CodeFileService) {}

  ngOnInit() {
    if (this.codeFile.size <= 4000) {
      this.getContent();
    }
  }

  getContent() {
    this.codeFileService.findById(this.challenge.id, this.codeFile.id).subscribe(result => {
      this.codeFile = result;
    });
  }
}
