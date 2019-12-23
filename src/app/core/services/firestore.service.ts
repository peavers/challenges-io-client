import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FirestoreUser } from '../domain/modules';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private firestore: AngularFirestore
  ) {}

  findAll(): Observable<FirestoreUser[]> {
    const itemsCollection = this.firestore.collection<FirestoreUser>('users');

    return itemsCollection.valueChanges();
  }

  update(firestoreUser: FirestoreUser): Promise<void> {
    const doc = this.firestore.doc<FirestoreUser>(`/users/${firestoreUser.uid}`);

    return doc.update(firestoreUser);
  }
}
