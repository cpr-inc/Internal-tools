import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../service/auth.service';
import swal from 'sweetalert2'
import * as firebase from'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';

import { User } from '../../entities/user';

@Injectable()
export class UserService {

  messagedelet: boolean;

  newuserkey = new Subject<string>();
  public newuserkey$ = this.newuserkey.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private db: AngularFireDatabase,
  ) { }

  // create(email: string, password: string, displayName: string): void {
  create(email: string, password: string, displayName: string, department: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({
          displayName: displayName
        })
        this.newuserkey.next(user.uid);
        let userRef = this.db.object(`users/${user.uid}`)
        userRef.set(new User(user));
        userRef.update({ displayName: displayName });
        userRef.update({ department: department });
        let actionCodeSettings = { url: 'http://cpr-inc.jp/staff/' }
        this.afAuth.auth.currentUser.sendEmailVerification(actionCodeSettings)
        .then(() => {
          swal({
            title: '確認メールを送信しました！',
            text: '指定のメールアドレスにメールを送信しました。確認してください。',
            type: 'success',
            confirmButtonText: 'OK',
          })
          this.authService.logout();
        })
        .catch(error => console.error(error));
      })
      .catch(error => {
        console.error(error);
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          swal({
            title: 'ユーザー登録失敗',
            text: 'パスワードが短すぎます。６文字以上の入力してください。',
            type: 'error',
            confirmButtonText: 'OK'
          })
        } else if(errorCode == 'auth/email-already-in-use') {
          swal({
            title: 'ユーザー登録失敗',
            text: '指定された電子メールアドレスはすでに登録されています。',
            type: 'error',
            confirmButtonText: 'OK'
          })
        } else if(errorCode == 'auth/invalid-email') {
          swal({
            title: 'ユーザー登録失敗',
            text: '指定された電子メールアドレスは有効ではありません。',
            type: 'error',
            confirmButtonText: 'OK'
          })
        }else if(errorCode == 'auth/argument-error'){
          swal({
            title: 'ユーザー登録失敗',
            text: 'パスワードが無効です。',
            type: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          swal({
            title: 'ユーザー登録失敗',
            text: errorMessage,
            type: 'error',
            confirmButtonText: 'OK'
          })
        }
      });
  }

  //ユーザー情報更新
  update(values): void {
    this.afAuth.auth.currentUser.updateProfile(values)
      .then(() => {
        this.db.object(`users/${this.afAuth.auth.currentUser.uid}`).update(values)
      })
      .catch(error => console.error(error));
  }

  //ユーザーアカウント削除
  delete(): void {
    this.afAuth.auth.currentUser.delete()
      .then(() => {
        this.db.object(`users/${this.afAuth.auth.currentUser.uid}`).remove()
        swal({
          title: 'アカウント削除完了',
          type: 'success',
          confirmButtonText: 'OK'
        })
      })
      .catch(error => {
        console.error(error)
        this.reauth()
      });
  }

  reset(NewPassWord){
    this.afAuth.auth.currentUser.updatePassword(NewPassWord).then( () => {
      // Update successful.
      console.log('successful')
    }).catch(error => {
      // An error happened.
      console.log('error')
    });
  }


  //ユーザー情報の重要な改変があるときの再認証（退会等）
  reauth(): void {
    let email = this.afAuth.auth.currentUser.email;
    swal({
      title: 'パスワードを入力してください',
      input: 'password',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      inputPlaceholder: 'Enter your password',
      showLoaderOnConfirm: true,
      
      preConfirm: (password) => {
        let credential = firebase.auth.EmailAuthProvider.credential(email, password);
        this.afAuth.auth.currentUser.reauthenticateWithCredential(credential)
        .then(() => {
          return this.messagedelet = true
        })
        .catch(error => {
          console.error(error)
          swal({
            title: 'ユーザー削除失敗',
            text: 'パスワードが一致しません。',
            type: 'error',
            confirmButtonText: 'OK'
          })
          swal.showValidationError(' ')
          return this.messagedelet = false 
        });
        return new Promise((resolve) => {
          setTimeout(() => { resolve() }, 2000)
        })
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value && this.messagedelet) {
        swal({
          type: 'success',
          title: 'ユーザーアカウントを削除しました！',
        })
        this.delete();
      }
    })
  }
}