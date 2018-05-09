import { Component, OnInit, Input } from '@angular/core';
import { SidenavStateService } from '../../core/service/sidenav-state.service'
import { MobileService } from '../../core/service/mobile.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sitebrand',
  templateUrl: './sitebrand.component.html',
  styleUrls: ['./sitebrand.component.scss']
})
export class SitebrandComponent implements OnInit {

  //モバイル端末向けデザイン切替フラグ
  @Input() mobile

  // mobile: boolean; 

  //オブザーバブル受け取り用
  subscription: Subscription;

  //開閉状態を格納
  LeftSidenavOpend: boolean;

  constructor(
    private SidebarStateService: SidenavStateService,
    private MobileService: MobileService
  ) { }

  ngOnInit() {
    //サービスから左サイドメニューの開閉状態を取得
    this.subscription = this.SidebarStateService.LeftSidenav$.subscribe(
      state => {
        this.LeftSidenavOpend = state;
        // console.log('sitebrand → this.LeftSidenavOpend:',this.LeftSidenavOpend)
      }
    );
    //初期設定の受け渡しが上手くいかないので不使用、サイトが立ち上がってからはしっかり受け取る
    // this.subscription = this.MobileService.Mobile$.subscribe(
    //   state => {
    //     this.mobile = state;
    //     console.log('sitebrand → this.mobile:',state)
    //   }
    // );
  }

  //左サイドバー開閉アイコンのクリックイベント時にサービスで開閉状態切替関数を実行する
  LeftSidenavToggle(){
    this.SidebarStateService.LeftSidenavToggle();
  }

}