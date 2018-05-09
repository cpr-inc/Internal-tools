import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeletemodalComponent } from '../../share/element/modal/deletemodal/deletemodal.component'
import { EditmodalComponent } from '../../share/element/modal/editmodal/editmodal.component'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Task } from '../../entities/task'
import { ThemecolorService } from '../../core/service/themecolor.service'
import { Subscription } from 'rxjs/Subscription';
import { MenuItems } from '../../entities/const/menu-items';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  menuitems = MenuItems;
  isloading: boolean = true;

  ngOnInit(){
    this.isloading = false;
  }

  ngAfterViewInit() {
    let googleform1 = <HTMLVideoElement> document.getElementById('geppo');
    let googleform2 = <HTMLVideoElement> document.getElementById('kotuhi');

    googleform1.addEventListener("ended", function(){
      console.log("動画が終了しました"); //ここに要素入れ替えのスクリプトを書く
    }, true);
  }
}