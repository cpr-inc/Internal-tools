import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitebrandComponent } from './sitebrand.component';

describe('SitebrandComponent', () => {
  let component: SitebrandComponent;
  let fixture: ComponentFixture<SitebrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitebrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitebrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
