import { TestBed, inject } from '@angular/core/testing';

import { ThemecolorService } from './themecolor.service';

describe('ThemecolorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemecolorService]
    });
  });

  it('should be created', inject([ThemecolorService], (service: ThemecolorService) => {
    expect(service).toBeTruthy();
  }));
});
