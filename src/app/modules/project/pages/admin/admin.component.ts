import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reviewer } from '../../../../core/domain/modules';
import { ReviewerService } from '../../../../core/services/reviewer.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewReviewerDialogComponent } from '../../../../shared/component/new-reviewer-dialog/new-reviewer-dialog.component';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  reviewers: Observable<Reviewer[]> = new Observable<Reviewer[]>();

  reviewer: Reviewer = {};

  constructor(public reviewerService: ReviewerService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
    this.reviewers = this.reviewerService.findAll();
  }

  create() {
    const dialogRef = this.dialog.open(NewReviewerDialogComponent, {
      width: '40vw',
      data: this.reviewer
    });

    dialogRef.afterClosed().subscribe((newReviewer: Reviewer) => {
      if (newReviewer) {
        this.snackBar.open('Working');

        this.reviewerService.create(this.reviewer).subscribe(
          result => {
            this.snackBar.open('Reviewer created', null, {
              duration: 5 * 1000
            });

            this.reviewer = {};

            this.reviewerService.reviewerStore.push(result);
          },
          error => {
            this.snackBar.open('Reviewer failed', null, {
              duration: 5 * 1000
            });
          }
        );
      }
    });
  }

  delete(reviewer: Reviewer) {
    this.reviewerService.delete(reviewer);
  }
}
