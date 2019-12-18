import { Component, Inject, Input } from '@angular/core';
import { Challenge, CodeFile } from '../../../../../core/domain/modules';
import { AuthService } from '../../../../../core/services/auth.service';
import { ChallengeService } from '../../../../../core/services/challenge.service';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-challenge-section-component',
  templateUrl: './challenge-section-component.html',
  styleUrls: ['./challenge-section-component.scss']
})
export class ChallengeSectionComponent {

  @Input()
  challenge: Challenge;

  @Input()
  tableOfContent: CodeFile[];

  constructor(
    private authService: AuthService,
    private challengeService: ChallengeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: any
  ) {
  }

}
