import { Component, Inject, Input } from '@angular/core';
import { Challenge } from '../../../../core/domain/modules';
import { AuthService } from '../../../../core/services/auth.service';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmDialogComponent } from '../../../../shared/component/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-danger-zone-section-component',
  templateUrl: './danger-zone-section-component.html',
  styleUrls: ['./danger-zone-section-component.scss']
})
export class DangerZoneSectionComponent {
  @Input()
  challenge: Challenge;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Delete',
    spinnerSize: 19,
    raised: false,
    stroked: false,
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(
    private authService: AuthService,
    private challengeService: ChallengeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  deleteChallenge() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '30vw'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {

        this.btnOpts.active = true;

        this.challengeService.delete(this.challenge).subscribe(
          () => {
            this.btnOpts.active = false;

            this.snackBar.open('Challenge deleted', null, {
              duration: 5 * 1000
            });
          },
          () => {
            this.btnOpts.active = false;

            this.snackBar.open('Deletion failed', null, {
              duration: 5 * 1000
            });
          }
        );
      } else {
        this.btnOpts.active = false;
      }
    });
  }
}
