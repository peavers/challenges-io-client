import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Router } from '@angular/router';
import { Challenge, Reviewer } from '../../../../core/domain/modules';
import { Observable } from 'rxjs';
import { ReviewerService } from '../../../../core/services/reviewer.service';

@Component({
  selector: 'app-default',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  levels: string[] = ['Intern', 'Junior', 'Intermediate', 'Senior'];

  positions: string[] = ['Frontend engineer', 'Backend engineer', 'Tech team'];

  reviewers: Observable<Reviewer[]> = new Observable<Reviewer[]>();

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Import',
    spinnerSize: 19,
    raised: false,
    stroked: false,
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  challenge: Challenge = {};

  constructor(
    private challengeService: ChallengeService,
    private reviewerService: ReviewerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.reviewers = this.reviewerService.findAll();
  }

  import() {
    this.snackBar.open('Working');
    this.btnOpts.active = true;

    this.challengeService.create(this.challenge).subscribe(
      result => {
        this.btnOpts.active = false;

        this.snackBar.open('Import success', null, {
          duration: 5 * 1000
        });

        this.challenge = {};
        this.router.navigate([`/review/${result.id}`]);
      },
      error => {
        this.btnOpts.active = false;

        this.snackBar.open('Import failed', null, {
          duration: 5 * 1000
        });
      }
    );
  }
}
