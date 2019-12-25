import { Component, Inject, Input, OnInit } from '@angular/core';
import { Challenge, CodeFile } from '../../../../../core/domain/modules';
import { AuthService } from '../../../../../core/services/auth.service';
import { ChallengeService } from '../../../../../core/services/challenge.service';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CodeFileService } from '../../../../../core/services/code-file.service';

@Component({
  selector: 'app-challenge-section-component',
  templateUrl: './challenge-section-component.html',
  styleUrls: ['./challenge-section-component.scss']
})
export class ChallengeSectionComponent implements OnInit {
  @Input()
  challenge: Challenge;

  tableOfContent: Observable<CodeFile[]>;

  constructor(
    private authService: AuthService,
    private challengeService: ChallengeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private codeFileService: CodeFileService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit(): void {
    this.tableOfContent = this.codeFileService.getTableOfContent(this.challenge.id);
  }
}
