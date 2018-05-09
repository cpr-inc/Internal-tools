import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './custom-material/custom-material.module'

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { SidenavStateService } from './service/sidenav-state.service'
import { ThemecolorService } from './service/themecolor.service'
import { MobileService } from './service/mobile.service'

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule, ReactiveFormsModule,
  ],
  exports: [CustomMaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [],
  providers: [
    UserService,
    AuthService,
    SidenavStateService,
    ThemecolorService,
    MobileService
   ]
})

export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error( 'CoreModule has already been loaded. Import Core modules in the AppModule only.' );
    }
  }
}