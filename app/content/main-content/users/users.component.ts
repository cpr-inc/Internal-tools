import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ThemecolorService } from '../../../core/service/themecolor.service'
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeletemodalComponent } from '../../..//share/element/modal/deletemodal/deletemodal.component'
import { EditmodalComponent } from '../../../share/element/modal/editmodal/editmodal.component'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { User } from '../../../entities/user'
import { UserdataComponent } from '../../../share/element/modal/userdata/userdata.component';
import swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  ThemeColor: string = 'theme-blue'
  subscription: Subscription;
  users: User[];
  usersRef: AngularFireList<any>;

  SelectUid: string;

  constructor(
    public dialog: MatDialog,
    private db: AngularFireDatabase,
    private ThemecolorService: ThemecolorService) {
      this.usersRef = db.list('/users');
     }

  ngOnInit() {

    this.usersRef.snapshotChanges()
    .subscribe(snapshots => {
      this.users = snapshots.map(snapshot => {
        const values = snapshot.payload.val();
        return new User({ key: snapshot.payload.key, ...values });
      });
    });

    this.subscription = this.ThemecolorService.ThemeColor$.subscribe(
      ThemeClassName => {
        this.ThemeColor = ThemeClassName;
        // console.log(this,' → modal color:',ThemeClassName)
      }
    );
  }

  SetUid(uid: string): void{
    this.SelectUid = uid;
  }

  CreatUser(){
    let dialogRef = this.dialog.open(UserdataComponent, {
      height: '100%',
      panelClass: this.ThemeColor,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    // console.log('The dialog was closed, trash :',result);
      if(result){
        this.usersRef.update(this.SelectUid, { isTrash: true });
      }
    });
  }

  Edit(){
    let dialogRef = this.dialog.open(UserdataComponent, {
      width: '20vw',
      height: '25vh',
      panelClass: this.ThemeColor,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    // console.log('The dialog was closed, trash :',result);
      if(result){
        this.usersRef.update(this.SelectUid, { isTrash: true });
      }
    });
  }

  Delete(key: string,index: number){
    let dialogRef = this.dialog.open(DeletemodalComponent, {
      width: '20vw',
      height: '25vh',
      panelClass: this.ThemeColor,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed, trash :',result);
      if(result){
        this.usersRef.update(this.SelectUid, { isTrash: true });
      }
    });
    swal({
      customClass: this.ThemeColor,
      title: '注意！',
      text: `「 ${this.users[index].displayName} 」を削除しますか？`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'swal-btn--ok',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        // this.event.emit(key+'+delete');
        swal({
          customClass: this.ThemeColor,
          title: '削除完了',
          text: `タスク「 ${this.users[index].displayName} 」を削除しました。`,
          type: 'success',
          confirmButtonClass: 'swal-btn--ok',
        })
      }
    })
  }

}
