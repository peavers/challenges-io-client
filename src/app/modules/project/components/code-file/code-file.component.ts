import { Component, Input, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { CodeFile } from '../../../../core/domain/modules';

@Component({
  selector: 'app-code-file-component',
  templateUrl: './code-file.component.html',
  styleUrls: ['./code-file.component.scss']
})
export class CodeFileComponent implements OnInit {
  @Input()
  codeFile: CodeFile;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit() {}

  saveComment($event) {
    this.codeFile.codeLines[$event.id].comments = $event.comments;
    // this.challengeService.updateFile(this.codeFile).subscribe();
  }
}
