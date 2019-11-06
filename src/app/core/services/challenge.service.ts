import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Challenge } from '../domain/modules';
import { DeleteConfirmDialogComponent } from '../../shared/component/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private readonly endpoint: string;

  private challengeSubject: BehaviorSubject<Challenge[]> = new BehaviorSubject<Challenge[]>([]);

  private challengeStore: Challenge[] = [];

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.endpoint = `${environment.postServer}/v1/challenges`;
  }

  findAll(): Observable<Challenge[]> {
    this.httpClient.get<Challenge[]>(this.endpoint).subscribe(challenges => {
      this.challengeStore = challenges;

      this.challengeSubject.next(this.challengeStore);
    });

    return this.challengeSubject.asObservable();
  }

  findById(id: string): Observable<Challenge> {
    return this.httpClient.get<Challenge>(`${this.endpoint}/${id}`);
  }

  create(challenge: Challenge): Observable<Challenge> {
    return this.httpClient.post<Challenge>(`${this.endpoint}`, challenge);
  }

  update(challenge: Challenge): void {
    this.httpClient.patch<Challenge>(`${this.endpoint}`, challenge).subscribe();
  }

  delete(challenge: Challenge): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '30vw',
    });

    console.log(challenge.id);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.httpClient.delete<Challenge>(`${this.endpoint}/${challenge.id}`).subscribe(() => {
          this.snackBar.open(`Project deleted`, '', {
            duration: 5 * 1000
          });

          this.router.navigate(['/']);
        });
      }
    });
  }
}
