import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Component({
  selector: 'app-mat-paginator-intl-ja',
  templateUrl: './mat-paginator-intl-ja.component.html',
  styleUrls: ['./mat-paginator-intl-ja.component.scss']
})

export class MatPaginatorIntlJa extends MatPaginatorIntl {

  itemsPerPageLabel = '表示件数：';
  nextPageLabel     = '次';
  previousPageLabel = '戻';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `${length} 件中 0`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${length} 件中 ${startIndex + 1} から ${endIndex} まで表示`;
  }
}