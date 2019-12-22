import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';
import { Reviewer } from '../domain/modules';

export interface User {
  uid?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId?: string;
  githubLogin?: string;
  githubAccessToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public angularFireAuth: AngularFireAuth, private router: Router) {}

  doGoogleLogin() {
    return new Promise<any>(resolve => {
      let provider = new auth.GoogleAuthProvider();
      provider.setCustomParameters({ hd: 'codacy.com' });
      provider.addScope('profile');
      provider.addScope('email');

      this.angularFireAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
          this.router.navigate(['/']);
        },
        error => {
          console.log('unable to communicate with Google', error);
        }
      );
    });
  }

  public getUser(): User {
    return this.angularFireAuth.auth.currentUser;
  }

  public getReviewer(): Reviewer {
    const user = this.getUser();

    let reviewer: Reviewer = {};
    reviewer.photoUrl = user.photoURL;
    reviewer.displayName = user.displayName;
    reviewer.email = user.email;
    reviewer.id = user.uid;

    return reviewer;
  }

  public logout() {
    this.angularFireAuth.auth.signOut();

    this.router.navigate(['/login']);
  }
}
