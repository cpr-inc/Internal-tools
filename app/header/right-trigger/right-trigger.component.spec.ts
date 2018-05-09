import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightTriggerComponent } from './right-trigger.component';

describe('RightTriggerComponent', () => {
  let component: RightTriggerComponent;
  let fixture: ComponentFixture<RightTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
