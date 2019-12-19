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

  constructor(private codeFileService: CodeFileService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.codeFile.size <= 4000) {
      this.getContent();
    }
  }

  saveCodeLine($event) {
    this.codeFile.codeLines[$event.id] = $event;

    this.codeFileService.update(this.codeFile);
  }

  getContent() {
    const reviewer = this.authService.getReviewer();

    this.codeFileService.findById(this.challenge.id, this.codeFile.id).subscribe(result => {
      this.codeFile = result;
    });
  }
}
