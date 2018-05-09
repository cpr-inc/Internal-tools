import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

import { HeaderComponent } from './header.component';
import { SitebrandComponent } from './sitebrand/sitebrand.component';
import { NotificationComponent } from './notification/notification.component';
import { RightTriggerComponent } from './right-trigger/right-trigger.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  declarations: [
    HeaderComponent,
    SitebrandComponent,
    NotificationComponent,
    RightTriggerComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
