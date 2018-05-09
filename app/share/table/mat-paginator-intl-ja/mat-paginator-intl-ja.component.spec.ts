import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorIntlJa } from './mat-paginator-intl-ja.component';

describe('MatPaginatorIntlJaComponent', () => {
  let component: MatPaginatorIntlJa;
  let fixture: ComponentFixture<MatPaginatorIntlJa>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatPaginatorIntlJa ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPaginatorIntlJa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
