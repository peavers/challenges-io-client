import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { LoadingScreenService } from '../../../core/services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  loadingSubscription: Subscription;

  matSnackBarRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(private loadingScreenService: LoadingScreenService, public snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(debounceTime(200)).subscribe(value => {
      this.loading = value;

      if (value) {
        this.matSnackBarRef = this.snackbar.open('Working...', null, { horizontalPosition: 'center' });
      } else {
        this.matSnackBarRef.dismiss();
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
