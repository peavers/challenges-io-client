import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirestoreUser } from '../../../../core/domain/modules';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReviewGroupDialogComponent } from '../../../../shared/component/dialogs/review-group-dialog/review-group-dialog.component';
import {
  DIALOG_WIDTH,
  SNACKBOX_LOADING,
  SNACKBOX_DISPLAY_TIME,
  SNACKBOX_MESSAGE_FAILURE,
  SNACKBOX_MESSAGE_SUCCESS
} from '../../../../core/constants';

@Component({
  selector: 'app-admin-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  reviewers: Observable<FirestoreUser[]> = new Observable<FirestoreUser[]>();

  constructor(private firestoreService: FirestoreService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
    this.reviewers = this.firestoreService.findAll();
  }

  update(reviewer: FirestoreUser) {
    const dialogRef = this.dialog.open(ReviewGroupDialogComponent, {
      width: DIALOG_WIDTH,
      data: reviewer
    });

    dialogRef.afterClosed().subscribe((firestoreUser: FirestoreUser) => {
      if (firestoreUser) {
        this.snackBar.open(SNACKBOX_LOADING);

        this.firestoreService.update(firestoreUser).then(
          result => {
            this.snackBar.open(SNACKBOX_MESSAGE_SUCCESS, null, {
              duration: SNACKBOX_DISPLAY_TIME
            });
          },
          error => {
            this.snackBar.open(SNACKBOX_MESSAGE_FAILURE, null, {
              duration: SNACKBOX_DISPLAY_TIME
            });
          }
        );
      }
    });
  }
}
