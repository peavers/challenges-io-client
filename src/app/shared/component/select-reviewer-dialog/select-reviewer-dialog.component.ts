import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reviewer } from '../../../core/domain/modules';
import { ReviewerService } from '../../../core/services/reviewer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './select-reviewer-dialog.component.html',
  styleUrls: ['./select-reviewer-dialog.component.scss']
})
export class SelectReviewerDialogComponent implements OnInit {
  reviewers: Observable<Reviewer[]> = new Observable<Reviewer[]>();

  modifiedReviewers: Reviewer[] = [];

  constructor(
    private _ngZone: NgZone,
    private dialogRef: MatDialogRef<SelectReviewerDialogComponent>,
    private reviewerService: ReviewerService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  submit() {
    this.dialogRef.close(this.modifiedReviewers);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.reviewers = this.reviewerService.findAll();
  }
}
