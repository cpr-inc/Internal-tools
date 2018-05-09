import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../core/service/user.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../../../entities/user'
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2'


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  users: User[];
  usersRef: AngularFireList<any>;
  userkey:any;
  key:string;
  newuser: User;
  password: string;

  public adduserkey: String = '';
  private subscription: Subscription;


  constructor(
    private userService: UserService,
    private db: AngularFireDatabase
  ) { 
    this.usersRef = db.list('/users');
  }

  ngOnInit() {
    this.usersRef.snapshotChanges()
    .subscribe(snapshots => {
      this.users = snapshots.map(snapshot => {
        const values = snapshot.payload.val();
        return new User({ key: snapshot.payload.key, ...values });
      });
      this.NewUserInfoGet();
    });
    this.subscription = this.userService.newuserkey$.subscribe(
      key => {
        this.adduserkey = key;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signup(f: NgForm) {
    this.userService.create(
      f.value.email, 
      f.value.password,
      f.value.displayName,
      f.value.department);
    this.password = f.value.password
  }

  NewUserInfoGet(){
    if(this.adduserkey){
      for(let user of this.users){
        if(user.uid == this.adduserkey 
          && user.displayName 
          && user.email 
          && user.department){
          this.addeduser(user);
        }
      }
    }
  }

  addeduser(user){
    swal({
      title: 'ユーザー登録完了',
      html:
      `Email: ${user.email} <br>` +
      `password: ${this.password} <br>` +
      `名前: ${user.displayName} <br>` +
      `所属: ${user.department} <br>` ,
      type: 'success',
      confirmButtonText: 'OK'
    })
  }

      //要素追加用
      // alltasksItemsRef: AngularFireObject<any>;

    // for (let task of this.alltasks) {
    //   this.alltasksItemsRef = this.db.object('/tasks/'+ this.task.key);
    //   this.alltasksItemsRef.update({ No: i });
    // }


}
