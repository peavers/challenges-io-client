import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Reviewer } from '../domain/modules';
import { DeleteConfirmDialogComponent } from '../../shared/component/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {
  private readonly endpoint: string;
  private reviewerSubject: BehaviorSubject<Reviewer[]> = new BehaviorSubject<Reviewer[]>([]);

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.endpoint = `${environment.postServer}/v1/reviewers`;
  }

  private _reviewerStore: Reviewer[] = [];

  get reviewerStore(): Reviewer[] {
    return this._reviewerStore;
  }

  findAll(): Observable<Reviewer[]> {
    this.httpClient.get<Reviewer[]>(this.endpoint).subscribe(reviewers => {
      this._reviewerStore = reviewers;

      this.reviewerSubject.next(this._reviewerStore);
    });

    return this.reviewerSubject.asObservable();
  }

  findById(id: string): Observable<Reviewer> {
    return this.httpClient.get<Reviewer>(`${this.endpoint}/${id}`);
  }

  create(reviewer: Reviewer): Observable<Reviewer> {
    return this.httpClient.post<Reviewer>(`${this.endpoint}`, reviewer);
  }

  update(reviewer: Reviewer): Observable<Reviewer> {
    return this.httpClient.patch<Reviewer>(`${this.endpoint}`, reviewer);
  }

  delete(reviewer: Reviewer): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '40vw'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.httpClient.delete<Reviewer>(`${this.endpoint}/${reviewer.id}`).subscribe(() => {
          this.findAll();

          this.snackBar.open(`Reviewer deleted`, '', {
            duration: 5 * 1000
          });
        });
      }
    });
  }
}
