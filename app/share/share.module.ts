import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlJa } from './table/mat-paginator-intl-ja/mat-paginator-intl-ja.component';

import { TableComponent } from './table/table.component';
import { LoaderComponent } from './element/loader/loader.component';
import { SearchBarComponent } from './element/search-bar/search-bar.component';
import { EditmodalComponent } from './element/modal/editmodal/editmodal.component';
import { DeletemodalComponent } from './element/modal/deletemodal/deletemodal.component';
import { UsertableComponent } from './usertable/usertable.component';
import { UserdataComponent } from './element/modal/userdata/userdata.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  declarations: [
    TableComponent,
    LoaderComponent,
    SearchBarComponent,
    EditmodalComponent,
    DeletemodalComponent,
    UsertableComponent,
    UserdataComponent,
    MatPaginatorIntlJa
  ],
  exports: [ 
    TableComponent, EditmodalComponent, DeletemodalComponent, LoaderComponent, UsertableComponent, MatPaginatorIntlJa
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlJa},
  ],
  entryComponents: [
    EditmodalComponent, DeletemodalComponent, UserdataComponent
  ]
})
export class ShareModule { }
