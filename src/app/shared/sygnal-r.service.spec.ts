import { TestBed } from '@angular/core/testing';

import { SygnalRService } from './sygnal-r.service';

describe('SygnalRService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SygnalRService = TestBed.get(SygnalRService);
    expect(service).toBeTruthy();
  });
});
