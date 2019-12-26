import { Component, Input, OnInit } from '@angular/core';
import { Challenge, CodeFile } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';
import { SNACKBOX_MESSAGE_FAILURE, SNACKBOX_MESSAGE_SUCCESS } from '../../../../core/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private codeFileService: CodeFileService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.codeFile.size <= 4000) {
      this.getContent();
    }
  }

  saveCodeLine($event) {
    this.codeFile.codeLines[$event.id] = $event;

    this.codeFileService.update(this.codeFile).subscribe(
      () => {
        this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS);
      },
      () => {
        this.snackBar.open(SNACKBOX_MESSAGE_FAILURE);
      }
    );
  }

  getContent() {
    this.codeFileService.findById(this.challenge.id, this.codeFile.id).subscribe(result => {
      this.codeFile = result;
    });
  }
}
