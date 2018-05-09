import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  authSubject = new Subject<any>();
  auth$ = this.authSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth) { }

  login(email: string, password: string): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('ログイン')
      })
      .catch(error => console.error(error));
  }

  logout(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('ログアウト')
      })
      .catch(error => console.error(error));
  }

}