import { Component, Inject } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { Challenge } from '../../../../core/domain/modules';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-action-bar-component',
  templateUrl: './action-bar-component.html',
  styleUrls: ['./action-bar-component.scss']
})
export class ActionBarComponent {
  challenge: Challenge;

  constructor(
    private challengeService: ChallengeService,
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: any
  ) {}

  deleteChallenge(challenge: Challenge) {
    this.challengeService.delete(challenge);
  }

  copyToClip(url: string) {
    this.clipboardService.copyFromContent(url);

    this.snackBar.open(`Copied ${url}`, null, {
      duration: 5 * 1000
    });
  }

  // TODO Sometime...
  feedback() {}
}
