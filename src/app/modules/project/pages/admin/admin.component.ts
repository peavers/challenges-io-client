import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Router } from '@angular/router';
import { Reviewer } from '../../../../core/domain/modules';
import { ReviewerService } from '../../../../core/services/reviewer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  reviewers: Observable<Reviewer[]> = new Observable<Reviewer[]>();

  reviewer: Reviewer = {};

  roles: string[] = ['User', 'Admin'];

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Create',
    spinnerSize: 19,
    raised: false,
    stroked: false,
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(public reviewerService: ReviewerService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.reviewers = this.reviewerService.findAll();
  }

  create() {
    this.snackBar.open('Working');
    this.btnOpts.active = true;

    this.reviewerService.create(this.reviewer).subscribe(
      result => {
        this.btnOpts.active = false;

        this.snackBar.open('Reviewer created', null, {
          duration: 5 * 1000
        });

        this.reviewer = {};

        this.reviewerService.reviewerStore.push(result);

      },
      error => {
        this.btnOpts.active = false;

        this.snackBar.open('Reviewer failed', null, {
          duration: 5 * 1000
        });
      }
    );
  }

  delete(reviewer: Reviewer) {
    this.reviewerService.delete(reviewer);
  }
}
