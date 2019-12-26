import {Component, Inject, Input} from '@angular/core';
import {Challenge} from '../../../../../core/domain/modules';
import {AuthService} from '../../../../../core/services/auth.service';
import {ChallengeService} from '../../../../../core/services/challenge.service';
import {MatDialog} from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteConfirmDialogComponent} from '../../../../../shared/component/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import {
  DIALOG_WIDTH,
  SNACKBOX_DISPLAY_TIME,
  SNACKBOX_MESSAGE_FAILURE,
  SNACKBOX_MESSAGE_SUCCESS
} from '../../../../../core/constants';
import {Router} from "@angular/router";

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
    raised: true,
    stroked: false,
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private challengeService: ChallengeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  deleteChallenge() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: DIALOG_WIDTH
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.btnOpts.active = true;

        this.challengeService.delete(this.challenge).subscribe(
          () => {
            this.btnOpts.active = false;

            this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS, null, {
              duration: SNACKBOX_DISPLAY_TIME
            });

            this.router.navigate(['/']);
          },
          () => {
            this.btnOpts.active = false;

            this.snackBar.open(SNACKBOX_MESSAGE_FAILURE, null, {
              duration: SNACKBOX_DISPLAY_TIME
            });
          }
        );
      } else {
        this.btnOpts.active = false;
      }
    });
  }
}
