import { TestBed, inject } from '@angular/core/testing';

import { SidenavStateService } from './sidenav-state.service';

describe('SidebarStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavStateService]
    });
  });

  it('should be created', inject([SidenavStateService], (service: SidenavStateService) => {
    expect(service).toBeTruthy();
  }));
});
