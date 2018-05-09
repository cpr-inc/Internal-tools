import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ThemeColors } from '../../share/const/theme-color'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class ThemecolorService {

  ThemeClassName: string = "theme-blue";
  ThemeColorSubject = new Subject<string>();
  public ThemeColor$ = this.ThemeColorSubject.asObservable();

  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
  ) { 
    console.log(this.ThemeClassName)
   }

  switching(ClassName: string){
    console.log(this.ThemeClassName)
    //console.log(this,' → switch color:',ThemeClassName)
    this.ThemeClassName = "theme-" + ClassName
    // console.log(this,' → switch color:',ThemeClassName)
    this.ThemeColorSubject.next(this.ThemeClassName);
    this.UpdataThemeColor(ClassName)
  }

  GetColor(){
    console.log(this.ThemeClassName)
    return this.ThemeClassName
  }

  UpdataThemeColor(ClassName: string){
    console.log(this.userRef)
    this.userRef.update({themecolor: ClassName})
  }

  SetUid(userRef: AngularFireObject<any>){
    this.userRef = userRef
    console.log('SetUid:',this.userRef)
  }

}