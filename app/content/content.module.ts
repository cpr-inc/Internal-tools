import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ShareModule } from '../share/share.module'

import { ContentComponent } from '../content/content.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LeftSidenavComponent } from './left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './right-sidenav/right-sidenav.component';
import { TodoComponent } from './main-content/todo/todo.component';
import { NewUserComponent } from './main-content/users/new-user/new-user.component';
import { LoginComponent } from './main-content/users/login/login.component';
import { SignUpComponent } from './main-content/users/sign-up/sign-up.component';
import { UsersComponent } from './main-content/users/users.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,ShareModule
  ],
  declarations: [
    ContentComponent,
    MainContentComponent,
    LeftSidenavComponent,
    RightSidenavComponent,
    TodoComponent,
    NewUserComponent,
    LoginComponent,
    SignUpComponent,
    UsersComponent
  ],
  exports: [ContentComponent],
})
export class ContentModule { }
