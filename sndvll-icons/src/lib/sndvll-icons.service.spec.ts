import { TestBed } from '@angular/core/testing';

import { SndvllIconsService } from './sndvll-icons.service';

describe('SndvllIconsService', () => {
  let service: SndvllIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SndvllIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
