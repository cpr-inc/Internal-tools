import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeColors, ThemeColor } from '../../share/const/theme-color'
import { ThemecolorService } from '../../core/service/themecolor.service'

@Component({
  selector: 'app-right-sidenav',
  templateUrl: './right-sidenav.component.html',
  styleUrls: ['./right-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RightSidenavComponent implements OnInit {

  //importしたテーマカラーを格納（しないと認識しない）
  ThemeColors: ThemeColor[] = ThemeColors;

  constructor(private ThemecolorService: ThemecolorService) { }

  ngOnInit() {
  }

  //テーマクラス選択、右サイドバーの各要素のクリックイベント
  SelectThemeColor(index: number){
    //クリックされたテーマクラス名を格納
    let classname = this.ThemeColors[index].classname
    //[class.]のために各テーマ名のアクティブを切り替える
    for(let themecolor of this.ThemeColors){
      if(themecolor.classname==classname){
        themecolor.active = true;
      }else{
        themecolor.active = false;
      }
    }
    //アクティブにするテーマクラス名をサービスに送り、グローバル変数にしてもらう
    this.ThemecolorService.switching(classname);
  }

}
