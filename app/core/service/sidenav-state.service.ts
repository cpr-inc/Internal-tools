import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidenavStateService {

  //サイドナビの開閉状態を格納
  LeftSidenavOpened: boolean = false
  //サイドナビの開閉状態をオブザーバルグローバル変数として各コンポーネントに受け渡す
  LeftSidenavOpenedSubject = new Subject<boolean>();
  public LeftSidenav$ = this.LeftSidenavOpenedSubject.asObservable();

  RightSidenavOpened: boolean = false
  RightSidenavOpenedSubject = new Subject<boolean>();
  public RightSidenav$ = this.RightSidenavOpenedSubject.asObservable();

  constructor() { 
  }

  //開閉状態を取得する関数,サイドバー(close)イベント時等の今の値と違うときはtoggle関数に実行
  SetLeftSidenavOpened(State: boolean): void{
    if(this.LeftSidenavOpened != State){
      this.LeftSidenavToggle()
    }else{
      this.LeftSidenavOpened = State;
    }
  }

  SetRightSidenavOpened(State: boolean): void{
    if(this.RightSidenavOpened != State){
      this.RightSidenavToggle()
    }else{
      this.RightSidenavOpened = State;
    }
  }

  //各コンポーネントの開閉状態変更トリガーによって実行、
  //保持している開閉状態の逆を受け渡し、片方が開く時に片方が閉まるようにする
  LeftSidenavToggle(): void{
    this.LeftSidenavOpened = !this.LeftSidenavOpened
    this.LeftSidenavOpenedSubject.next(this.LeftSidenavOpened);
    if(this.LeftSidenavOpened && this.RightSidenavOpened){
      this.RightSidenavOpenedSubject.next(false);
    }
  }

  RightSidenavToggle(): void{
    this.RightSidenavOpened = !this.RightSidenavOpened
    this.RightSidenavOpenedSubject.next(this.RightSidenavOpened);
    if(this.LeftSidenavOpened && this.RightSidenavOpened){
      this.LeftSidenavOpenedSubject.next(false);
    }
  }

}
