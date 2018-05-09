import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './header/header.module'
import { ContentModule} from './content/content.module'
import { ShareModule } from './share/share.module'

import { LayoutModule } from '@angular/cdk/layout';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,HeaderModule,ContentModule,ShareModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LayoutModule,
    SweetAlert2Module.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
