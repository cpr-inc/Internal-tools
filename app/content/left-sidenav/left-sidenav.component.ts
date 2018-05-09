import { Component, OnInit,  } from '@angular/core';
import { MenuItems } from '../../entities/const/menu-items';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../core/service/auth.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../../entities/user'
import { Observable } from 'rxjs/Observable';
import { SidenavStateService } from '../../core/service/sidenav-state.service'

@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.scss']
})
export class LeftSidenavComponent implements OnInit {

  menus = MenuItems;
  
  LoginStatus:boolean;

  users: User[];

  UserData: Observable<User[]>;

  userRef: AngularFireObject<any>;
  
  constructor( 
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private db: AngularFireDatabase,
    private SidebarStateService: SidenavStateService
  ) 
  { 
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.LoginStatus = true;
        this.userRef = db.object(`users/${user.uid}`);
      }else{
        this.LoginStatus = false;
      }
    })
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        console.log(user)
        this.LoginStatus = true;
        this.UserData = this.userRef.valueChanges();
        console.log(this.UserData)
      }else{
        this.LoginStatus = false;
      }
    })
  }

  ActiveItem(ActiveItemName: string){
    if(ActiveItemName=='ログアウト'){
      this.authService.logout();
      for(let menuitem of this.menus){
        menuitem.view = false;
      }
    }else{
      for(let menuitem of this.menus){
        if(menuitem.name == ActiveItemName){
          menuitem.view = true;
        }else{
          menuitem.view = false;
        }
      }
      this.LeftSidenavToggle()
    }
  }

  LeftSidenavToggle(){
    //console.log('sitebrand → mune toggle click')
    this.SidebarStateService.LeftSidenavToggle();
  }


}

