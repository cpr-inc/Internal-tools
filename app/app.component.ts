import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SidenavStateService } from './core/service/sidenav-state.service'
import { ThemecolorService } from './core/service/themecolor.service'
import { MobileService } from './core/service/mobile.service'
import { BreakpointObserver, Breakpoints, BreakpointState　} from '@angular/cdk/layout';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './core/service/auth.service';
import { User } from './entities/user'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subscription: Subscription
  ThemeColor: string //サービスで初期設定を流せないのでここで定義している（暫定）
  mobile: boolean
  isloading: boolean = true;
  LoginStatus:boolean;

  // users: User[];
  userRef: AngularFireObject<any>;
  UserData: Observable<User>;


//ログインユーザーを取得し、そのユーザーのDBオブジェクトのテーマカラーだけ読むようにする
  constructor(
    private ThemecolorService: ThemecolorService,
    private MobileService: MobileService,
    private breakpointObserver: BreakpointObserver,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private db: AngularFireDatabase,
  ) { 
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.LoginStatus = true;
        this.userRef = db.object(`users/${user.uid}`);
        this.UserData = this.userRef.valueChanges();
        this.UserData.subscribe(
          user => {
            ThemecolorService.SetUid(this.userRef)
            if(user.themecolor){
              ThemecolorService.switching(user.themecolor)
            }
          })
      }else{
        this.LoginStatus = false;
        this.ThemeColor = ThemecolorService.GetColor()
      }
    })
  }

  ngOnInit(){
    //ローディングフラグ
    // this.isloading = false;
    //サービスからテーマカラーを取得
    this.subscription = this.ThemecolorService.ThemeColor$.subscribe(
      ThemeClassName => {
        this.ThemeColor = ThemeClassName;
        // console.log(this,' → catch color:',ThemeClassName)
      }
    );
    //画面サイズ取得し、モバイル向けのデザインフラグを返す
    this.breakpointObserver
    .observe(['(max-width: 1024px)']) //1024px以下の画面サイズの時にtrueが返る
    .subscribe((state: BreakpointState) => {
        this.mobile = state.matches;
        // this.MobileService.SetMobileState(this.mobile);
    });
  }

  //html内では変数の変化を検知しないため[ngClass]=function()を使う
  GetThemeColor(){
    return this.ThemeColor
  }
}