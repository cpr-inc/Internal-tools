import { Component, OnInit, Input, HostListener, } from '@angular/core';
import { SidenavStateService } from '../core/service/sidenav-state.service'
import { Subscription } from 'rxjs/Subscription';
import { ThemeColors } from '../share/const/theme-color'
import { ThemecolorService } from '../core/service/themecolor.service'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() mobile
  LeftSidenavOpend: boolean = false;

  //sidebarの開閉状態を双方向バインド変数
  LeftSidenavState: boolean;
  RightSideOpened: boolean = false;

  subscription: Subscription

  constructor(private SidenavStateService: SidenavStateService){
    this.LeftSidenavState = this.mobile ? false : true;
    //初期状態のサイドバーの開閉状態をサービスに渡す（サービスでフラグを切り替えるため）
    this.SidenavStateService.SetLeftSidenavOpened(false);
    this.SidenavStateService.SetRightSidenavOpened(false);
  }

  ngOnInit(){
    //開閉フラグ切り替わりを取得
    this.subscription = this.SidenavStateService.LeftSidenav$.subscribe(
      state => {
        this.LeftSidenavOpend = state;
      });
    //開閉フラグ切り替わりを取得 右  
    this.subscription = this.SidenavStateService.RightSidenav$.subscribe(
      state => {
        this.RightSideOpened = state;
    });
  }

  //(opne),(cloce)イベント発火時に実行,開閉切替を受け取り、開閉双方向バインドを更新、サービスに開閉状態送信
  LeftSidenvaStateEvent(state){
    this.LeftSidenavOpend = state;
    this.SidenavStateService.SetLeftSidenavOpened(this.LeftSidenavOpend);
  }

  RightSidenavStateEvent(status){
    this.RightSideOpened = status;
    this.SidenavStateService.SetRightSidenavOpened(this.RightSideOpened);
  }

  //左サイドバーの開閉状態を関数で返す
  SetLeftSidenavState(){
    this.LeftSidenavState = this.mobile ? this.LeftSidenavOpend : true;
    return this.LeftSidenavState
  }
}