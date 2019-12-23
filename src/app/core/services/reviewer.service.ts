import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FirestoreUser, Reviewer } from '../domain/modules';
import { DeleteConfirmDialogComponent } from '../../shared/component/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {
  private readonly endpoint: string;

  reviewers: Observable<FirestoreUser[]> = new Observable<FirestoreUser[]>();

  private itemsCollection: AngularFirestoreCollection<FirestoreUser>;

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private firestore: AngularFirestore
  ) {
    this.endpoint = `${environment.postServer}/v1/reviewers`;

    this.itemsCollection = this.firestore.collection<FirestoreUser>('users');
    this.reviewers = this.itemsCollection.valueChanges();
  }

  findAll(): Observable<FirestoreUser[]> {
    this.itemsCollection = this.firestore.collection<FirestoreUser>('users');
    this.reviewers = this.itemsCollection.valueChanges();

    return this.reviewers;
  }

  update(firestoreUser: FirestoreUser): Promise<void> {
    const doc = this.firestore.doc<FirestoreUser>(`/users/${firestoreUser.uid}`);
    return doc.update(firestoreUser);
  }

  create(reviewer: Reviewer): Observable<Reviewer> {
    return this.httpClient.post<Reviewer>(`${this.endpoint}`, reviewer);
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
